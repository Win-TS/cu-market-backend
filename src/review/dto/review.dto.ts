import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddReviewDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  productId: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  reviewerId: string;
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  star: number;
  @IsOptional()
  @IsString()
  @ApiProperty()
  reviewDescription?: string;
}

export class EditReviewDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  id: number;
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  star: number;
  @IsOptional()
  @IsString()
  @ApiProperty()
  reviewDescription?: string;
}
