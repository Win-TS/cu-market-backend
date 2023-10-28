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
  expiryTime: Date;

  @ApiProperty()
  address: string;

  @ApiProperty({ example: [{ url: 'imageUrl1', key: 'imageKey1' }, { url: 'imageUrl2', key: 'imageKey2' }] })
  image: string[];

  @ApiProperty()
  buyerId: string;
}

export class LastMinBidProductResponse extends ProductOutputResponse {
  @ApiProperty()
  timeRemaining: number;
}
