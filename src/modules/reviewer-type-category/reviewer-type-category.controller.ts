import { Controller, Get } from '@nestjs/common';
import { ReviewerTypeCategoryFindClientAllService } from './services/reviewer-type-category-find-all-client.service';

@Controller('reviewer-type-category')
export class ReviewerTypeCategoryController {
  constructor(
    private readonly reviewerTypeCategoryFindAllService: ReviewerTypeCategoryFindClientAllService,
  ) {}

  @Get()
  async findAll() {
    return this.reviewerTypeCategoryFindAllService.execute();
  }
}
