import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { NewMessageDto } from './dto/chat.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

//@UseGuards(JwtGuard)
@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  //   @ApiResponse({ status: 200, description: 'OK' })
  //   @ApiResponse({ status: 401, description: 'Unauthorized' })
  //   @ApiResponse({ status: 403, description: 'Forbidden' })
  //   @ApiOperation({
  //     summary: 'GET Chat Rooms of Student ID from Path Parameter',
  //     description:
  //       'GET Chat Rooms of Student ID from Path Parameter in MongoDB',
  //   })
  //   @Get('all/:studentId')
  //   getAllChats(@Param('studentId') studentId: string) {
  //     return this.chatService.studentChat(studentId);
  //   }

  //   @ApiResponse({ status: 200, description: 'OK' })
  //   @ApiResponse({ status: 401, description: 'Unauthorized' })
  //   @ApiResponse({ status: 403, description: 'Forbidden' })
  //   @ApiOperation({
  //     summary: 'GET Chat Room of 2 Student IDs from Query Parameter',
  //     description:
  //       'GET Chat Room of 2 Student IDs from Query Parameter in MongoDB',
  //   })
  //   @Get('find')
  //   findChat(
  //     @Query('student1Id') student1Id: string,
  //     @Query('student2Id') student2Id: string,
  //   ) {
  //     return this.chatService.findChat(student1Id, student2Id);
  //   }

  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'Create New Chat Message into Chat ID room',
    description: 'Create New Chat Message into Chat ID room to Database',
  })
  @Post('newMessage')
  newMessage(@Body() dto: NewMessageDto) {
    return this.chatService.createMessage(dto);
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'GET Chat Messages of Chat ID from Query Parameter',
    description: 'GET Chat Messages of Chat ID from Query Parameter in Database',
  })
  @Get('messages')
  getMessagesofChat(
    @Query('student1Id') student1Id: string,
    @Query('student2Id') student2Id: string,
  ) {
    return this.chatService.getMessages(student1Id, student2Id);
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary:
      'GET Chat Rooms and Latest Message of Student ID from Path Parameter',
    description:
      'GET Chat Rooms and Latest Message of Student ID from Path Parameter in Database',
  })
  @Get('latest/:studentId')
  getLatestChats(@Param('studentId') studentId: string) {
    return this.chatService.getLatestChats(studentId);
  }
}
