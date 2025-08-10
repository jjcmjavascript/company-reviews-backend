import { Controller, Get, Query } from '@nestjs/common';
import { ReviewerTypeFindAllService } from './services/reviewer-type-find-all.service';
import { ReviewerTypeDto } from './reviewer-type.dto';

@Controller('reviewer-types')
export class ReviewerTypeController {
  constructor(private readonly findAllService: ReviewerTypeFindAllService) {}

  @Get()
  async findAll(@Query() params: ReviewerTypeDto) {
    return this.findAllService.execute(params);
  }
}
