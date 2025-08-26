import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ReviewerTypeCategoryFindByIdService } from './services/reviewer-type-category-find-by-id.service';
import { ReviewerTypeCategoryFindByIdRepository } from './repositories/reviewer-type-category-find-by-id.repository';
import { ReviewerTypeCategoryFindAllService } from './services/reviewer-type-category-find-all.service';
import { ReviewerTypeCategoryFindClientAllService } from './services/reviewer-type-category-find-all-client.service';
import { ReviewerTypeCategoryFindAllRepository } from './repositories/reviewer-type-category-find-all.repository';
import { ReviewerTypeCategoryController } from './reviewer-type-category.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewerTypeCategoryController],
  providers: [
    ReviewerTypeCategoryFindByIdRepository,
    ReviewerTypeCategoryFindByIdService,
    ReviewerTypeCategoryFindAllRepository,
    ReviewerTypeCategoryFindAllService,
    ReviewerTypeCategoryFindClientAllService,
  ],
  exports: [
    ReviewerTypeCategoryFindByIdRepository,
    ReviewerTypeCategoryFindByIdService,
    ReviewerTypeCategoryFindAllRepository,
    ReviewerTypeCategoryFindAllService,
  ],
})
export class ReviewerTypeCategoryModule {}
