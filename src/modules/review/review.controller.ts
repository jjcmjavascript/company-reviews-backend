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
import { CurrentUser, JwtUser } from '@shared/decorators/user.decorator';
import { Loged } from '@shared/decorators/loged.decorator';

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
  @Loged()
  async create(
    @Body() review: ReviewCreateDto,
    @CurrentUser() currentUser: JwtUser,
  ) {
    return this.createService.execute(review, currentUser);
  }
}
