import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { NewMessageDto } from './dto/chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  chatIdGenerator(student1Id: string, student2Id: string) {
    let chatId: string;
    if (Number(student1Id) < Number(student2Id)) {
      chatId = student1Id + 'x' + student2Id;
    } else if (Number(student1Id) === Number(student2Id)) {
      throw new BadRequestException('Cannot send message to same id');
    } else {
      chatId = student2Id + 'x' + student1Id;
    }
    return chatId;
  }

  async createMessage(dto: NewMessageDto) {
    const chatId = this.chatIdGenerator(dto.senderId, dto.receiverId);
    try {
      const newMessage = await this.prisma.chat.create({
        data: {
          chatId: chatId,
          senderId: dto.senderId,
          receiverId: dto.receiverId,
          message: dto.message,
        },
      });
      return newMessage;
    } catch (error) {
      throw new ForbiddenException('Failed to create new message');
    }
  }

  async getMessages(student1Id: string, student2Id: string) {
    const chatId = this.chatIdGenerator(student1Id, student2Id);
    try {
      const messages = await this.prisma.chat.findMany({
        where: { chatId: chatId },
        select: {
          chatId: true,
          senderId: true,
          receiverId: true,
          message: true,
          createdAt: true,
        },
      });
      return messages;
    } catch (error) {
      throw new ForbiddenException('Failed to find messages from chat');
    }
  }

  async getLatestChats(studentId: string) {
    const latestMessages = await this.prisma.chat.groupBy({
      by: ['chatId'],
      where: {
        OR: [{ senderId: studentId }, { receiverId: studentId }],
      },
      _max: {
        createdAt: true,
      },
      orderBy: {
        _max: {
          createdAt: 'desc',
        },
      },
    });
    const messages = [];
    for (const entry of latestMessages) {
      const latestMessage = await this.prisma.chat.findFirst({
        where: {
          chatId: entry.chatId,
          createdAt: entry._max.createdAt,
          OR: [{ senderId: studentId }, { receiverId: studentId }],
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (latestMessage) {
        messages.push({
          chatId: latestMessage.chatId,
          senderId: latestMessage.senderId,
          receiverId: latestMessage.receiverId,
          message: latestMessage.message,
          createdAt: latestMessage.createdAt,
        });
      }
    }
    return messages;
  }
}
