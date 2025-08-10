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

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    ReviewerTypeModule,
    ReviewerTypeCategoryModule,
    ReportedCompanyModule,
  ],
  providers: [
    ReviewDetailCreateRepository,
    ReviewFindAllRepository,
    ReviewCreateRepository,
    ReviewFindAllService,
    ReviewCreateService,
  ],
  controllers: [ReviewController],
  exports: [ReviewFindAllRepository, ReviewFindAllService],
})
export class ReviewModule {}
