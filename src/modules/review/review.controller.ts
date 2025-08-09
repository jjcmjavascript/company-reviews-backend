import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ReviewCreateDto } from './dto/review-create.dto';
import { ReviewCreateService } from './services/review-create.service';
import { ReviewFindDto } from './dto/review-find.dto';
import { ReviewFindAllService } from './services/review-find-all.service';

@Controller('reviews/company')
export class ReviewController {
  constructor(
    private readonly findAllService: ReviewFindAllService,
    private readonly createService: ReviewCreateService,
  ) {}

  @Get(':reportedCompanyId')
  async findReviewsByCompanyId(
    @Param('reportedCompanyId', ParseIntPipe) reportedCompanyId: number,
    @Query() params: ReviewFindDto,
  ) {
    return this.findAllService.execute(reportedCompanyId, params);
  }

  @Post()
  async create(@Body() review: ReviewCreateDto) {
    return this.createService.execute(review);
  }
}
