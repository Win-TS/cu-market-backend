import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignUpDto {

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'studentId' })
  studentId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'firstName' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'lastName' })
  lastName: string;

}
