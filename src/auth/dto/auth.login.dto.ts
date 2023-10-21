import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthLoginDto {

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'studentId' })
  studentId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, description: 'remember' })
  remember: boolean;

}
