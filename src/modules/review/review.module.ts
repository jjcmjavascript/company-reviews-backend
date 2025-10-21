import { Module } from '@nestjs/common';
import { ReviewFindAllRepository } from './repositories/review-find-all.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ReviewFindAllService } from './services/review-find-all.service';
import { ReviewController } from './review.controller';
import { ReviewCreateService } from './services/review-create.service';
import { ReviewCreateRepository } from './repositories/review-create.repository';
import { ReviewDetailCreateRepository } from '@modules/review-details/repositories/review-details-create.repositoy';
import { CategoryModule } from '@modules/category/category.module';
import { ReviewerTypeModule } from '@modules/reviewer-type/reviewer-type.module';
import { ReportedCompanyModule } from '@modules/reported-company/reported-company.module';
import { ReviewerTypeCategoryModule } from '@modules/reviewer-type-category/reviewer-type-category.module';
import { CompanyCategoryScoreModule } from '@modules/company-category-score/company-category-score.module';
import { ReviewDeleteService } from './services/review-delete.service';
import { ReviewDetailsModule } from '@modules/review-details/review-details.module';
import { ReviewTodayCountByUserRepository } from './repositories/review-today-count-by-user.repository';
import { ProfanityModule } from '@modules/profanity/profanity.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    ReviewerTypeModule,
    ReviewerTypeCategoryModule,
    ReportedCompanyModule,
    CompanyCategoryScoreModule,
    ReviewDetailsModule,
    ProfanityModule,
  ],
  providers: [
    ReviewDetailCreateRepository,
    ReviewFindAllRepository,
    ReviewCreateRepository,
    ReviewFindAllService,
    ReviewCreateService,
    ReviewDeleteService,
    ReviewTodayCountByUserRepository,
  ],
  controllers: [ReviewController],
  exports: [ReviewFindAllRepository, ReviewFindAllService, ReviewDeleteService],
})
export class ReviewModule {}
