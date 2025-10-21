import { Injectable } from '@nestjs/common';
import { ProfanityFilterService } from '@shared/services/profanity/profanity-filter.service';
import { ProfanityLanguage } from '@shared/services/profanity/profanity.types';

@Injectable()
export class ProfanityService {
  constructor(
    private readonly profanityFilterService: ProfanityFilterService,
  ) {}

  execute(
    text: string,
    language: ProfanityLanguage = 'es',
  ): {
    cleanedText: string;
    containsProfanity: { hasProfanity: boolean; cleaneable: boolean };
    error?: boolean;
  } {
    if (!text || text.toString().trim() === '') {
      return {
        cleanedText: '',
        containsProfanity: { hasProfanity: false, cleaneable: false },
        error: true,
      };
    }

    const trimmedText = text.toString().trim();

    const containsProfanity = this.profanityFilterService.containsProfanity(
      trimmedText,
      language,
    );

    let cleanedText = trimmedText;

    if (containsProfanity.hasProfanity && containsProfanity.cleaneable) {
      cleanedText = this.profanityFilterService.clean(trimmedText, language);
    } else if (containsProfanity.hasProfanity) {
      cleanedText = '[CLEANING NOT POSSIBLE]';
    }

    return {
      cleanedText,
      containsProfanity,
    };
  }
}
