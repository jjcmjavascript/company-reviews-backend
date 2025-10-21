import { Body, Controller, Post } from '@nestjs/common';
import { ProfanityDto } from './profanity.dto';
import { ProfanityService } from './profanity.service';

@Controller('profanity')
export class ProfanityController {
  constructor(private readonly profanityService: ProfanityService) {}

  @Post('test')
  test(@Body() body: ProfanityDto) {
    const { text } = body;

    return this.profanityService.execute(text);
  }
}
