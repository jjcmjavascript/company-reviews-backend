import { Module } from '@nestjs/common';
import { ReviewDetailsFindTopRepository } from './repositories/review-details-find-top.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ReviewDetailsController } from './review-details.controller';
import { ReviewDetailsByCompanyService } from './services/review-details-by-company.service';
import { ReviewDetailsFindAllRepository } from './repositories/review-details-find-all.repository';
import { ReviewDetailsDeleteByReviewRepository } from './repositories/review-details-delete-by-review.repository';
import { ReviewDetailsDeleteByReviewService } from './services/review-details-delete-by-review.service';
import { ReviewDetailsCreateService } from './services/review-details-create.service';
import { ReviewDetailsCreateRepository } from './repositories/review-details-create.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    ReviewDetailsCreateRepository,
    ReviewDetailsFindTopRepository,
    ReviewDetailsCreateRepository,
    ReviewDetailsFindAllRepository,
    ReviewDetailsDeleteByReviewRepository,
    ReviewDetailsDeleteByReviewService,
    ReviewDetailsByCompanyService,
    ReviewDetailsCreateService,
  ],
  exports: [
    ReviewDetailsByCompanyService,
    ReviewDetailsDeleteByReviewService,
    ReviewDetailsCreateService,
  ],
  controllers: [ReviewDetailsController],
})
export class ReviewDetailsModule {}
