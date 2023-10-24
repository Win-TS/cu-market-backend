import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [PrismaModule, AwsModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
