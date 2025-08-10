import { Module } from '@nestjs/common';
import { CompanyCategoryScoreCreateService } from './services/company-category-score-create.service';

@Module({
  providers: [CompanyCategoryScoreCreateService],
  controllers: [],
  exports: [CompanyCategoryScoreCreateService],
  imports: [],
})
export class CompanyCategoryScoreModule {}
