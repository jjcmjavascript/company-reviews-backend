import { Module } from '@nestjs/common';
import { UserDailyReviewService } from './user-daily-review.service';
import { UserDailyReviewRepository } from './user-daily-review.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserDailyReviewService, UserDailyReviewRepository],
  exports: [UserDailyReviewService],
})
export class UserDailyReviewModule {}
