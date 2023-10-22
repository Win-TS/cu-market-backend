import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddProductDto, EditProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async addProduct(dto: AddProductDto) {
    console.log(dto);
    const user = await this.prisma.user.findUnique({
      where: { studentId: dto.studentId },
    });
    if (!user)
      throw new ForbiddenException(
        `User Not Found, Student ID: ${dto.studentId}`,
      );
    console.log(user);
    try {
      const product = await this.prisma.product.create({
        data: {
          productName: dto.productName,
          description: dto.description,
          startPrice: dto.startPrice,
          available: dto.available,
          address: dto.address,
          user: { connect: { studentId: dto.studentId } },
        },
      });
      console.log(product);
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
      });
      return products;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve products');
    }
  }

  async editProduct(dto: EditProductDto) {
    const { id, ...updatedData } = dto;
    const existingProduct = await this.prisma.product.findUnique({
      where: { id: id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id: dto.id },
        data: updatedData,
      });
      return updatedProduct;
    } catch (error) {
      throw new ForbiddenException('Failed to edit product');
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
}
