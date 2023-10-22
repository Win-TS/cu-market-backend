import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'GET User Info', description: 'Get User Info from Database through JWT used'})
  @Get('info')
  getMe(@GetUser() user: User) {
    return user;
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'GET Order History of User', description: 'GET Order History Info of User from Database through JWT used'})
  @Get('history')
  orderHistory(@GetUser('studentId') studentId: string) {
    return this.userService.orderHistory(studentId);
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'PATCH Bought Item of User', description: 'PATCH Bought Item of User to Database through Product ID (id in Product table) and JWT used'})
  @Patch('buy/:productId')
  buyProduct(@GetUser('studentId') studentId: string, @Param('productId') productId: string) {
    return this.userService.buyProduct(studentId, Number(productId));
  }

}
