import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NewMessageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  receiverId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  message: string;
}
