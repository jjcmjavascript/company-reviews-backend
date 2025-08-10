import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ReviewerTypeFindAllRepository } from './repositories/reviewer-type-find-all.repository';
import { ReviewerTypeFindAllService } from './services/reviewer-type-find-all.service';
import { ReviewerTypeController } from './reviewer-type.controller';

@Module({
  imports: [PrismaModule],
  providers: [ReviewerTypeFindAllRepository, ReviewerTypeFindAllService],
  controllers: [ReviewerTypeController],
  exports: [ReviewerTypeFindAllRepository, ReviewerTypeFindAllService],
})
export class ReviewerTypeModule {}
