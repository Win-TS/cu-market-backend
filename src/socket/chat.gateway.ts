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
import { JoinChatDto, MessageDto, NewChatDto } from './dto/chat.dto';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');
  private redisClient: Redis;
  constructor() {
    this.redisClient = new Redis();
  }

  // For Seller
  @SubscribeMessage('createChat')
  public async startChat(client: Socket, payload: NewChatDto) {
    this.logger.log(`Client Joined Chat Room (${payload.room}): ${client.id}`);
    client.join(payload.room);
    payload.socketIds.push(client.id);
    await this.redisClient.set(payload.room, JSON.stringify(payload));
    return client.emit('chatCreated', payload);
  }

  // For Bidder
  @SubscribeMessage('joinChat')
  public async joinChat(client: Socket, payload: JoinChatDto) {
    const newClient = payload.bidderId;
    const payloadString = await this.redisClient.get(payload.room);
    if (payloadString) {
      const payload: NewChatDto = JSON.parse(payloadString);
      if (payload.bidderId === newClient) {
        client.join(payload.room);
        this.logger.log(
          `Client Joined Chat Room (${payload.room}): ${client.id}`,
        );
        payload.socketIds.push(client.id);
        await this.redisClient.set(payload.room, JSON.stringify(payload));
        return client.emit('chatJoined', payload);
      } else {
        return client.emit('chatNotExist', null);
      }
    } else {
      return client.emit('chatNotExist', null);
    }
  }

  @SubscribeMessage('sendMessage')
  public async handleMessage(client: Socket, payload: MessageDto) {
    const payloadString = await this.redisClient.get(payload.room);
    let reciever;
    if (payloadString) {
      const chatPayload: NewChatDto = JSON.parse(payloadString);
      if (chatPayload.bidderId === payload.senderId || chatPayload.sellerId === payload.senderId) {
        if (chatPayload.sellerId === payload.senderId) {
          reciever = chatPayload.socketIds[1];
        } else {
          reciever = chatPayload.socketIds[0];
        }
        chatPayload.chatHistory.push({ senderId: payload.senderId, msg: payload.message })
        await this.redisClient.set(payload.room, JSON.stringify(chatPayload));
        return client.to(reciever).emit('messageReceived', payload)
      }
    }
  }

  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
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
