import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ReviewerTypeCategoryFindRepository } from './repositories/reviewer-type-category-find.repository';
import { ReviewerTypeCategoryFindService } from './services/reviewer-type-category-find.service';

@Module({
  imports: [PrismaModule],
  providers: [
    ReviewerTypeCategoryFindRepository,
    ReviewerTypeCategoryFindService,
  ],
  exports: [
    ReviewerTypeCategoryFindRepository,
    ReviewerTypeCategoryFindService,
  ],
})
export class ReviewerTypeCategoryModule {}
