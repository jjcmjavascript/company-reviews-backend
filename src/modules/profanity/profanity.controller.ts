import { Body, Controller, Post } from '@nestjs/common';
import { ProfanityFilterService } from '@shared/services/profanity/profanity-filter.service';

@Controller('profanity')
export class ProfanityController {
  constructor(
    private readonly profanityFilterService: ProfanityFilterService,
  ) {}

  @Post('test')
  test(@Body() body: { text: string }): string {
    const { text } = body;
    if (!text || text.toString().trim() === '') {
      return 'No text provided.';
    }
    const trimmedText = text.toString().trim().slice(0, 50);

    const containsProfanity = this.profanityFilterService.containsProfanity(
      trimmedText,
      'es',
    );
    const cleanedText = this.profanityFilterService.clean(trimmedText);

    return `Contains profanity: ${containsProfanity}. Cleaned text: ${cleanedText}`;
  }
}
