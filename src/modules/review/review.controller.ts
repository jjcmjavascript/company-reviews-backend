import {
  Body,
  Controller,
  Delete,
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
import { ReviewDeleteService } from './services/review-delete.service';

@Controller('reviews/company')
export class ReviewController {
  constructor(
    private readonly findAllService: ReviewFindAllService,
    private readonly createService: ReviewCreateService,
    private readonly deleteService: ReviewDeleteService,
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

  @Delete(':id')
  @Loged()
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: JwtUser,
  ) {
    return this.deleteService.execute(id, currentUser);
  }
}
