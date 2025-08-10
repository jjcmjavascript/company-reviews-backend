import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ReviewerTypeCategoryFindByIdService } from './services/reviewer-type-category-find-by-id.service';
import { ReviewerTypeCategoryFindByIdRepository } from './repositories/reviewer-type-category-find-by-id.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    ReviewerTypeCategoryFindByIdRepository,
    ReviewerTypeCategoryFindByIdService,
  ],
  exports: [
    ReviewerTypeCategoryFindByIdRepository,
    ReviewerTypeCategoryFindByIdService,
  ],
})
export class ReviewerTypeCategoryModule {}
