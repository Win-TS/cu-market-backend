import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  studentId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  productName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  startPrice: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  endPrice: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  available: boolean;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  expiryTime: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;

  @IsOptional()
  @ApiProperty({ example: ['imageUrl', 'imageKey'] })
  image: string[];
}
