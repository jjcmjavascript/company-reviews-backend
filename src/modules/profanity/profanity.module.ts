import { Module } from '@nestjs/common';
import { ProfanityFilterService } from '@shared/services/profanity/profanity-filter.service';

@Module({
  providers: [ProfanityFilterService],
  exports: [ProfanityFilterService],
})
export class ProfanityModule {}
