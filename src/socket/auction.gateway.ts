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

@WebSocketGateway({ namespace: '/auction' })
export class AuctionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private redisClient: Redis;
  constructor() {
    this.redisClient = new Redis();
    this.checkExpiredRooms();
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AuctionGateway');

  // unfinished
  private async checkExpiredRooms() {
    // Check for expired rooms every minute (adjust the interval as needed)
    setInterval(async () => {
      const currentTimestamp = Date.now();
      const expiredRooms = await this.redisClient.zrangebyscore('expiryTimes', '-inf', currentTimestamp);

      // Process each expired room
      for (const room of expiredRooms) {
        // Emit "end of bidding" event to clients in the room
        this.server.to(room).emit('endOfBidding');

        // Delete room and its payload from Redis
        await this.redisClient.del(room);
        await this.redisClient.zrem('expiryTimes', room);
      }
    }, 60000); // 1 minute interval
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
    client.join(payload.room);
    const productPayload = await this.redisClient.get(payload.room);
    if (productPayload) {
      const updatedProductPayload = JSON.parse(productPayload);
      updatedProductPayload.currentBidder = payload.bidderId;
      updatedProductPayload.currentPrice = payload.bidPrice;
      updatedProductPayload.bidHistory.unshift({
        studentId: payload.bidderId,
        bidPrice: payload.bidPrice,
      });
      await this.redisClient.set(
        payload.room,
        JSON.stringify(updatedProductPayload),
      );
      this.server
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
    this.server.to(room).emit('productCancelled', room)
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
