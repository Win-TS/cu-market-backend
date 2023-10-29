export class NewChatDto {
    // use chat-${productId}
    room: any
    sellerId: string
    bidderId: string
    // For client socket id: [sellerSocketId, bidderSocketId]
    socketIds: string[]
    chatHistory: Object[]
}

export class JoinChatDto {
    room: any
    bidderId: string
}

export class MessageDto {
    room: any
    senderId: string
    message: string
}