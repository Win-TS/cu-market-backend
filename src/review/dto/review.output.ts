import { ApiProperty } from '@nestjs/swagger';

export class ReviewOutputResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  reviewerId: string;
  @ApiProperty()
  star: number;
  @ApiProperty()
  reviewDescription: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
