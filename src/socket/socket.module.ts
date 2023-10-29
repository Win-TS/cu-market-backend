import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuctionGateway } from './auction.gateway';
import { WsAdapter } from '@nestjs/platform-ws';
import { ChatService } from 'src/chat/chat.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [WsAdapter, PrismaModule],
    providers: [ChatGateway, AuctionGateway, ChatService]
})
export class SocketModule {}
