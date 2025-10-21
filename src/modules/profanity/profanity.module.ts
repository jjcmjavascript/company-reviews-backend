import { Module } from '@nestjs/common';
import { ProfanityFilterService } from '@shared/services/profanity/profanity-filter.service';
import { ProfanityController } from './profanity.controller';
import { ProfanityService } from './profanity.service';

@Module({
  controllers: [ProfanityController],
  providers: [ProfanityFilterService, ProfanityService],
  exports: [ProfanityService],
})
export class ProfanityModule {}
