import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import Redis from 'ioredis';
import { Server, Socket } from 'socket.io';
import { BidProductDto, NewProductDto } from './dto/auction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({ namespace: '/auction' })
export class AuctionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private redisClient: Redis;
  constructor(private prisma: PrismaService) {
    this.redisClient = new Redis();
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AuctionGateway');

  @SubscribeMessage('bidEnd')
  private async bidEnd(client: Socket, room: string) {
    const payloadString = await this.redisClient.get(room);
    if (payloadString) {
      const payload: NewProductDto = JSON.parse(payloadString);
      await this.prisma.product.update({
        where: { id: Number(room.slice(4)) },
        data: {
          available: false,
          endPrice: payload.currentPrice,
          buyerId: payload.currentBidder,
        },
      });
      return client.emit('bidEnded', payload);
    } else {
      return client.emit('productNotExist', null);
    }
  }

  @SubscribeMessage('enterRoom')
  public async enterRoom(client: Socket, room: string) {
    const payloadString = await this.redisClient.get(room);
    client.join(room);
    if (payloadString) {
      const payload: NewProductDto = JSON.parse(payloadString);
      return client.emit('biddingData', payload);
    } else {
      return client.emit('productNotExist', null);
    }
  }

  @SubscribeMessage('newProduct')
  public async newProduct(client: Socket, payload: NewProductDto) {
    this.logger.debug(payload);
    client.join(payload.room);
    await this.redisClient.set(payload.room, JSON.stringify(payload));
    return this.server.to(payload.room).emit('newBidRoomCreated', payload);
  }

  @SubscribeMessage('subscribeProduct')
  public async subscribeProduct(client: Socket, room: string): Promise<void> {
    this.logger.debug(`Client Subscribed to (${room}): ${client.id}`);
    client.join(room);
    const payloadString = await this.redisClient.get(room);
    if (payloadString) {
      const payload: NewProductDto = JSON.parse(payloadString);
      client.emit('productSubscribed', payload);
    } else {
      client.emit('productNotExist', null);
    }
  }

  @SubscribeMessage('unsubscribeProduct')
  public unsubscribeProduct(client: Socket, room: string): void {
    client.leave(room);
    client.emit('productUnsubscribed', room);
  }

  @SubscribeMessage('newBid')
  public async newBid(client: Socket, payload: BidProductDto) {
    this.logger.debug(payload);
    const productPayload = await this.redisClient.get(payload.room);
    const bidder = await this.prisma.user.findUnique({
      where: { studentId: payload.bidderId },
    });
    if (productPayload) {
      const updatedProductPayload = JSON.parse(productPayload);
      if (payload.bidPrice > bidder.lightBulbs) {
        return this.server.to(client.id).emit('notEnoughLightBulbs', payload);
      }
      updatedProductPayload.currentBidder = payload.bidderId;
      updatedProductPayload.currentPrice = payload.bidPrice;
      updatedProductPayload.bidHistory.unshift({
        studentId: payload.bidderId,
        bidPrice: payload.bidPrice,
        BidTime: payload.time,
      });
      await this.prisma.user.update({
        where: { studentId: payload.bidderId },
        data: {
          lightBulbs: {
            decrement: payload.bidPrice,
          },
        },
      });
      if (updatedProductPayload.bidHistory[1]) {
        await this.prisma.user.update({
          where: { studentId: updatedProductPayload.bidHistory[1].studentId },
          data: {
            lightBulbs: {
              increment: updatedProductPayload.bidHistory[1].bidPrice,
            },
          },
        });
      }
      await this.redisClient.set(
        payload.room,
        JSON.stringify(updatedProductPayload),
      );
      return this.server
        .to(payload.room)
        .emit('newBidReceived', updatedProductPayload);
    }
  }

  @SubscribeMessage('deleteProduct')
  public async deleteProduct(client: Socket, room: string) {
    const productPayload = await this.redisClient.get(room);
    if (productPayload) {
      await this.redisClient.del(room);
      this.logger.debug(`${room} deleted`);
    }
    this.server.in('/auction').in(room).socketsLeave(room);
    this.server.to(room).emit('productCancelled', room);
  }

  @SubscribeMessage('checkInProgress')
  public async checkProgress(client: Socket, studentId: string) {
    const activeRoomsKeys = await (
      await this.redisClient.keys('*')
    ).filter((roomKey) => roomKey.startsWith('bid-'));
    const roomsWithBids: any[] = [];
    for (const roomKey of activeRoomsKeys) {
      const roomPayloadString = await this.redisClient.get(roomKey);
      if (roomPayloadString) {
        const roomPayload: any = JSON.parse(roomPayloadString);
        const studentBidIndex = roomPayload.bidHistory.findIndex(
          (bid: any) => bid.studentId === studentId,
        );
        if (studentBidIndex !== -1) {
          const roomInfo = await this.prisma.product.findUnique({
            where: { id: Number(roomPayload.room.substring(4)) },
          });
          if (roomInfo) {
            const roomInfoNew = {
              ...roomInfo,
              currentBidder: roomPayload.currentBidder,
              currentPrice: roomPayload.currentPrice,
            };
            roomsWithBids.push(roomInfoNew);
          }
        }
      }
    }
    client.emit('roomsWithBids', roomsWithBids);
  }

  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }
}
