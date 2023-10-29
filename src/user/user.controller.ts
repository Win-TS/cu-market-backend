import { Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
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
  orderHistory(@GetUser('studentId') studentId: string, @Query('limit') limit?: string) {
    return this.userService.orderHistory(studentId, limit ? Number(limit) : undefined);
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'PATCH Bought Item of User', description: 'PATCH Bought Item of User to Database through Product ID (id in Product table)'})
  @Patch('buy')
  buyProduct(@Query('studentId') studentId: string, @Query('productId') productId: string, @Query('endPrice') endPrice: string) {
    return this.userService.buyProduct(studentId, Number(productId), Number(endPrice));
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'PATCH Lightbulbs Amount of User', description: 'PATCH Lightbulbs Amount of User to Database'})
  @Patch('updateLightBulb')
  updateLightBulbs(@Query('studentId') studentId: string, @Query('lightBulbs') lightBulbs: string) {
    return this.userService.updateLightBulbs(studentId, Number(lightBulbs));
  }

}
