import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddProductDto } from './dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private prisma: PrismaService) {}

  async addProduct(dto: AddProductDto) {
    const user = await this.prisma.user.findUnique({
      where: { studentId: dto.studentId },
    });
    if (!user)
      throw new ForbiddenException(
        `User Not Found, Student ID: ${dto.studentId}`,
      );
    try {
      const product = await this.prisma.product.create({
        data: {
          productName: dto.productName,
          description: dto.description,
          startPrice: dto.startPrice,
          quantity: dto.quantity,
          available: dto.available,
          address: dto.address,
          expiryTime: dto.expiryTime,
          image: dto.image,
          user: { connect: { studentId: dto.studentId } },
        },
      });
      return product;
    } catch (error) {
      throw new ForbiddenException('Failed to create product');
    }
  }

  async getAllProduct() {
    try {
      const products = await this.prisma.product.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          reviews: true,
        },
      });
      return products;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve products');
    }
  }

  async getAvailableProducts(limit: number) {
    try {
      const availableProducts = await this.prisma.product.findMany({
        where: {
          available: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit
      });
      return availableProducts;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve products');
    }
  }

  async getExpiredProducts(limit: number) {
    try {
      const expiredProducts = await this.prisma.product.findMany({
        where: {
          available: false,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: limit,
      });
      return expiredProducts;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve products');
    }
  }

  async getProductsById(studentId: string, limit: number) {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          studentId: studentId,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: limit,
        include: {
          reviews: true,
        },
      });
      return products;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve products');
    }
  }

  async getProductDetailsById(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: id },
      });
      console.log(product);
      return product;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve products');
    }
  }

  async getProductsNearExpiry(limit: number) {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          available: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
      });
      const sortedProducts = products.sort((a, b) => {
        const currentTime = new Date();
        const timeRemainingA = a.expiryTime.getTime() - currentTime.getTime();
        const timeRemainingB = b.expiryTime.getTime() - currentTime.getTime();
        return timeRemainingA - timeRemainingB;
      });
      return sortedProducts;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve products');
    }
  }

  async getProductBySearch(searchField: string, limit: number) {
    try {
      const searchProduct = await this.prisma.product.findMany({
        where: {
          AND: [
            {
              OR: [
                { productName: { contains: searchField, mode: 'insensitive' } },
                { description: { contains: searchField, mode: 'insensitive' } },
              ],
            },
            { available: true },
          ],
        },
        take: limit,
      });
      const sortedProducts = searchProduct.sort((a, b) => {
        const currentTime = new Date();
        const timeRemainingA = a.expiryTime.getTime() - currentTime.getTime();
        const timeRemainingB = b.expiryTime.getTime() - currentTime.getTime();
        return timeRemainingA - timeRemainingB;
      });
      return sortedProducts;
    } catch (error) {
      throw new ForbiddenException('Failed to search products');
    }
  }

  async deleteProduct(id: number) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id: id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    try {
      const deletedProduct = await this.prisma.product.delete({
        where: { id: id },
      });
      return deletedProduct;
    } catch (error) {
      throw new ForbiddenException('Failed to delete product');
    }
  }

  @Cron('*/3 * * * *')
  async updateExpireProduct(): Promise<void> {
    this.logger.log('Cron Job Execute: Update Availability');
    const products: Product[] = await this.prisma.product.findMany();
    for (const product of products) {
      if (product.available) {
        const currentTime = new Date();
        if (currentTime > product.expiryTime) {
          await this.prisma.product.update({
            where: { id: product.id },
            data: { available: false },
          });
        }
      }
    }
  }
}
