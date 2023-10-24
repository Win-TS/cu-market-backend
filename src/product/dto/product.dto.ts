import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
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
  @IsInt()
  @ApiProperty()
  startPrice: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  available: boolean;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  expiryLength: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;
}

export class EditProductDto extends AddProductDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  id: number;
}
