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

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  available: boolean;

  @IsOptional()
  @ApiProperty()
  expiryTime: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;

  @IsOptional()
  @ApiProperty({ example: [{ url: 'imageUrl1', key: 'imageKey1' }, { url: 'imageUrl2', key: 'imageKey2' }] })
  image: [];
}
