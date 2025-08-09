import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ReviewReactionController } from './review-reaction.controller';
import { ReviewReactionCreateService } from './services/review-reaction-create.service';
import { ReviewReactionUpdateRepository } from './repositories/review-reaction-update.repository';
import { ReviewReactionFindRepository } from './repositories/review-reaction-find.repository';
import { ReviewReactionFindAllRepository } from './repositories/review-reaction-find-all.repository';
import { ReviewReactionDestroyRepository } from './repositories/review-reaction-destroy.repository';
import { ReviewReactionCreateRepository } from './repositories/review-reaction-create.repository';
import { ReviewReactionListService } from './services/review-reaction-list.service';
import { ReviewReactionUpdateService } from './services/review-reaction-update.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewReactionController],
  providers: [
    ReviewReactionUpdateRepository,
    ReviewReactionFindRepository,
    ReviewReactionFindAllRepository,
    ReviewReactionDestroyRepository,
    ReviewReactionCreateRepository,
    ReviewReactionCreateService,
    ReviewReactionListService,
    ReviewReactionUpdateService,
  ],
  exports: [],
})
export class ReviewReactionModule {
  constructor() {}
}
