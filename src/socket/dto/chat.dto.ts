import { AnySoaRecord } from "dns"

export class NewChatDto {
    // use chat-${productId}
    room: any
    sellerId: String
    bidderId: String
    // For client socket id: [sellerSocketId, bidderSocketId]
    socketIds: String[]
    chatHistory: Object[]
}

export class JoinChatDto {
    room: any
    bidderId: String
}

export class MessageDto {
    room: any
    senderId: String
    message: String
}