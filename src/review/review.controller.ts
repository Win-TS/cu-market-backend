import { Controller, UseGuards, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtGuard } from 'src/auth/guard';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddReviewDto } from './dto/review.dto';
import { Body, Post, Delete, Patch } from '@nestjs/common/decorators';
import { EditReviewDto } from './dto/review.dto';
import { ReviewOutputResponse } from './dto/review.output';

@UseGuards(JwtGuard)
@ApiTags('Reviews')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  @Post('add')
  addReview(@Body() dto: AddReviewDto) {
    return this.reviewService.addReview(dto);
  }
  @ApiResponse({
    status: 200,
    description: 'Review Edited',
    type: ReviewOutputResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: EditReviewDto,
    description: 'Edit Review Form JSON, Return as Review Data JSON',
  })
  @ApiOperation({
    summary: 'Edit Review',
    description: 'Edit Review in Database',
  })
  @Patch('edit')
  editReview(@Body() dto: EditReviewDto) {
    return this.reviewService.editReview(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Review Deleted',
    type: ReviewOutputResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: 'Delete Review',
    description:
      'Delete Review from Database using Review ID (id in Review table)',
  })
  @Delete('delete/:id')
  deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(Number(id));
  }
}
