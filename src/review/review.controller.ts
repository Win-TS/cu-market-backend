import { Controller, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Reviews')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
}
