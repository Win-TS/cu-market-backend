import { ApiProperty } from '@nestjs/swagger';

export class ProductOutputResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  startPrice: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  available: boolean;

  @ApiProperty()
  expiryLength: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  buyerId: string;
}

export class LastMinBidProductResponse extends ProductOutputResponse {
  @ApiProperty()
  timeRemaining: number;
}
