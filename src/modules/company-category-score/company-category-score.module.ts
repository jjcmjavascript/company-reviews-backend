import { Module } from '@nestjs/common';
import { CompanyCategoryScoreCreateService } from './services/company-category-score-create.service';
import { CompanyCategoryScoreCreateRepository } from './repositories/company-category-score-create.repository';
import { CompanyCategoryScoreDecrementRepository } from './repositories/company-category-score-decrement.repository';

@Module({
  providers: [
    CompanyCategoryScoreCreateRepository,
    CompanyCategoryScoreCreateService,
    CompanyCategoryScoreDecrementRepository,
  ],
  controllers: [],
  exports: [
    CompanyCategoryScoreCreateRepository,
    CompanyCategoryScoreCreateService,
    CompanyCategoryScoreDecrementRepository,
  ],
  imports: [],
})
export class CompanyCategoryScoreModule {}
