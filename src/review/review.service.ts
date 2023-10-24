import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddReviewDto, EditReviewDto } from './dto/review.dto';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  async getReviewsBySellerId(sellerStudentId: string) {
    try {
      const reviews = await this.prisma.review.findMany({
        where: {
          product: {
            user: {
              studentId: sellerStudentId,
            },
          },
        },
      });
      return reviews;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve reviews');
    }
  }

  async getAverageStarBySellerId(sellerStudentId: string) {
    try {
      // Use Prisma aggregation to calculate the average star rating
      const reviews = await this.prisma.review.findMany({
        where: {
          product: {
            user: {
              studentId: sellerStudentId,
            },
          },
        },
        select: {
          star: true, // Select the star rating for aggregation
        },
      });

      const totalStars = reviews.reduce((sum, review) => sum + review.star, 0);
      const averageStar = totalStars / reviews.length;

      return averageStar;
    } catch (error) {
      throw new ForbiddenException('Failed to retrieve average star rating');
    }
  }

  async addReview(dto: AddReviewDto) {
    const user = await this.prisma.user.findUnique({
      where: { studentId: dto.reviewerId },
    });
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!user)
      throw new ForbiddenException(
        `User Not Found, Student ID: ${dto.reviewerId}`,
      );
    if (!product)
      throw new ForbiddenException(
        `Product Not Found, Product ID ${dto.productId}`,
      );
    try {
      const review = await this.prisma.review.create({
        data: {
          productId: dto.productId,
          reviewDescription: dto.reviewDescription,
          reviewerId: dto.reviewerId,
          star: dto.star,
        },
      });
      return review;
    } catch (error) {
      throw new ForbiddenException('Failed to create review');
    }
  }
  async editReview(dto: EditReviewDto) {
    const { id, ...updatedData } = dto;
    const existingReview = await this.prisma.review.findUnique({
      where: { id: id },
    });
    if (!existingReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    try {
      const updatedReview = await this.prisma.review.update({
        where: { id: dto.id },
        data: updatedData,
      });
      return updatedReview;
    } catch (error) {
      throw new ForbiddenException('Failed to edit product');
    }
  }
  async deleteReview(id: number) {
    const existingReview = await this.prisma.review.findUnique({
      where: { id: id },
    });
    if (!existingReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    try {
      const deletedReview = await this.prisma.review.delete({
        where: { id: id },
      });
      return deletedReview;
    } catch (error) {
      throw new ForbiddenException('Failed to delete Review');
    }
  }
}
