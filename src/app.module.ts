import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReviewModule } from './review/review.module';
import { AwsModule } from './aws/aws.module';
import { SocketModule } from './socket/socket.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    ProductModule,
    ScheduleModule.forRoot(),
    ReviewModule,
    AwsModule,
    SocketModule,
    ChatModule,
  ],
  controllers: []
})
export class AppModule {}
