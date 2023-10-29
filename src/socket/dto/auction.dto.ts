interface BidHistoryItem {
    studentId: string;
    bidPrice: number;
  }

export class NewProductDto {
    
    // use bid-${productId}
    room: any

    // product seller student Id
    sellerStudentId: String

    startPrice: number

    currentBidder: string

    currentPrice: number

    //expiryTime: Date

    // [{studentId: bidder1, bidPrice: bidPrice1}, {studentId: bidder2, bidPrice: bidPrice2}, ...] newest bid at index 0
    bidHistory: BidHistoryItem[]

}

export class BidProductDto {
    room: any
    bidderId: string
    bidPrice: number
}