import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReviewDetailsByCompanyService } from './services/review-details-by-company.service';

@Controller('review-details')
export class ReviewDetailsController {
  constructor(
    private readonly byCompanyService: ReviewDetailsByCompanyService,
  ) {}

  @Get('company/:reportedCompanyId')
  async findReviewsByCompanyId(
    @Param('reportedCompanyId', ParseIntPipe) reportedCompanyId: number,
  ) {
    return this.byCompanyService.execute({ reportedCompanyId });
  }
}
