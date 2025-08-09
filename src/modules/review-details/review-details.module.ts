import { Module } from '@nestjs/common';
import { ReviewDetailsFindTopRepository } from './repositories/review-details-find-top.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ReviewDetailsController } from './review-details.controller';
import { ReviewDetailsByCompanyService } from './services/review-details-by-company.service';
import { ReviewFindAllService } from '@modules/review/services/review-find-all.service';
import { ReviewDetailsFindAllRepository } from './repositories/review-details-find-all.repository';
import { ReviewModule } from '@modules/review/review.module';

@Module({
  imports: [PrismaModule, ReviewModule],
  providers: [
    ReviewDetailsFindTopRepository,
    ReviewDetailsFindAllRepository,
    ReviewFindAllService,
    ReviewDetailsByCompanyService,
  ],
  exports: [ReviewDetailsByCompanyService],
  controllers: [ReviewDetailsController],
})
export class ReviewDetailsModule {}
