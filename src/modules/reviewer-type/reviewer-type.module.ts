import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ReviewerTypeFindAllRepository } from './repositories/reviewer-type-find-all.repository';
import { ReviewerTypeFindAllService } from './services/reviewer-type-find-all.service';
import { ReviewerTypeController } from './reviewer-type.controller';
import { ReviewerTypeFindByIdService } from './services/reviewer-type-find-by-id.service';
import { ReviewerTypeFindByIdRepository } from './repositories/reviewer-type-find-by-id.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    ReviewerTypeFindAllRepository,
    ReviewerTypeFindByIdRepository,
    ReviewerTypeFindAllService,
    ReviewerTypeFindByIdService,
  ],
  controllers: [ReviewerTypeController],
  exports: [
    ReviewerTypeFindAllRepository,
    ReviewerTypeFindAllService,
    ReviewerTypeFindByIdService,
  ],
})
export class ReviewerTypeModule {}
