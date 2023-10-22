import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto, AuthLoginDto } from './dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'New User Sign Up Form',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: AuthSignUpDto,
    description: 'Sign Up Form JSON, Return as JWT Bearer Token',
  })
  signup(@Body() dto: AuthSignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User Log In Form',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: AuthLoginDto,
    description: 'Log In Form JSON, Return as JWT Bearer Token',
  })
  login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }

  

}
