import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@ApiTags('Users')
@Controller('users')
export class UserController {
  @ApiOkResponse({ description: 'GET User Info from Database' })
  @Get('info')
  getMe(@GetUser() user: User) {
    return user;
  }
}
