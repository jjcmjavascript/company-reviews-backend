import { Module } from '@nestjs/common';
import { CompanyCategoryScoreCreateService } from './services/company-category-score-create.service';
import { CompanyCategoryScoreCreateRepository } from './repositories/company-category-score-create.repository';

@Module({
  providers: [
    CompanyCategoryScoreCreateRepository,
    CompanyCategoryScoreCreateService,
  ],
  controllers: [],
  exports: [
    CompanyCategoryScoreCreateRepository,
    CompanyCategoryScoreCreateService,
  ],
  imports: [],
})
export class CompanyCategoryScoreModule {}
