import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';

import { Loged } from '@shared/decorators/loged.decorator';
import { CurrentUser, JwtUser } from '@shared/decorators/user.decorator';
import {
  ReviewReactionCreateDto,
  ReviewReactionListDto,
  ReviewReactionUpdateDto,
} from './review-reaction.dto';
import { ReviewReactionCreateService } from './services/review-reaction-create.service';
import { ReviewReactionUpdateService } from './services/review-reaction-update.service';
import { ReviewReactionListService } from './services/review-reaction-list.service';

@Controller('like-dislike')
export class ReviewReactionController {
  constructor(
    private readonly reviewReactionListService: ReviewReactionListService,
    private readonly reviewReactionCreateService: ReviewReactionCreateService,
    private readonly reviewReactionUpdateService: ReviewReactionUpdateService,
  ) {}

  @Get('reviewReactions')
  @HttpCode(HttpStatus.OK)
  async allLikes(@Query() body: ReviewReactionListDto) {
    return await this.reviewReactionListService.execute(body);
  }

  @Post('reviewReactions')
  @Loged()
  @HttpCode(HttpStatus.CREATED)
  async like(
    @Body() body: ReviewReactionCreateDto,
    @CurrentUser() user: JwtUser,
  ) {
    await this.reviewReactionCreateService.execute({
      ...body,
      userId: user.userId,
    });
  }

  @Put('reviewReactions')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() body: ReviewReactionUpdateDto,
    @Req() res: { user: { sub: number } },
  ) {
    return await this.reviewReactionUpdateService.execute({
      ...body,
      userId: res.user.sub,
    });
  }
}
