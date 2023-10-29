import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private prisma: PrismaService) {}

  async buyProduct(studentId: string, productId: number, endPrice: number) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    if (!existingProduct.available) {
      throw new ForbiddenException(
        `Product with ID ${productId} not available`,
      );
    }
    const boughtProduct = await this.prisma.product.update({
      where: { id: productId },
      data: {
        available: false,
        buyerId: studentId,
      },
    });
    return boughtProduct;
  }

  async orderHistory(studentId: string, limit: number) {
    try {
      const boughtProducts = await this.prisma.product.findMany({
        where: {
          buyerId: studentId,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        include: {
          reviews: true,
        },
        take: limit,
      });
      return boughtProducts;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve products');
    }
  }

  async updateLightBulbs(studentId: string, paotungToken: string) {
    try {
      const response: {
        data: {
          user: {
            id: string;
            email: string;
            firstName: string;
            familyName: string;
            money: number;
          };
        };
      } = await axios.get('https://paotooong.thinc.in.th/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${paotungToken}`,
        },
      });
      const student = await this.prisma.user.update({
        where: { studentId: studentId },
        data: {
          paotungToken: paotungToken,
          paotungId: response.data.user.id,
          lightBulbs: response.data.user.money,
        },
      });
      return student;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve products');
    }
  }
}
