import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuctionGateway } from './auction.gateway';
import { WsAdapter } from '@nestjs/platform-ws';

@Module({
    imports: [WsAdapter],
    providers: [ChatGateway, AuctionGateway]
})
export class SocketModule {}
