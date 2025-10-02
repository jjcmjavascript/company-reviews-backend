import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateReportedCompanyChatDto } from '../dto/create-reported-company-chat.dto';
import { ReportedCompanyChatCreateRepository } from '../repositories/reported-company-chat-create.repository';
import { DefaultLogger } from '@shared/services/logger.service';
import {
  ReportedCompanyChatEntity,
  ReportedCompanyChatPrimitive,
} from '@shared/entities/reportedCompanyChat.entity';
import { UserFindOneInternalService } from '@modules/users/services/user-find-one-internal.service';
import { User } from '@shared/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UserLimits } from '@config/config.interface';
import { ReportedCompanyChatCountRepository } from '../repositories/reported-company-chat-count.repository';

@Injectable()
export class ReportedCompanyChatCreateService {
  private logger = new DefaultLogger(ReportedCompanyChatCreateService.name);

  constructor(
    private readonly createService: ReportedCompanyChatCreateRepository,
    private readonly userFindService: UserFindOneInternalService,
    private readonly countService: ReportedCompanyChatCountRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    createReportedCompanyChatDto: CreateReportedCompanyChatDto,
    userId: number,
  ): Promise<Partial<ReportedCompanyChatPrimitive>> {
    this.logger.process({
      message: 'Creating reported company chat message',
      objects: {
        createReportedCompanyChatDto,
        userId,
      },
    });

    await this.checkUserChatLimit(userId);

    if (!userId) {
      throw new Error('User must be logged in to create a chat message.');
    }

    const { message, reportedCompanyId } = createReportedCompanyChatDto;

    const result = await this.createService.execute({
      message,
      reportedCompanyId,
      userId,
    });

    this.logger.processEnd({
      message: 'Reported company chat message created successfully',
      objects: {
        result,
      },
    });

    const user = await this.userFindService.execute({ id: userId })!;

    return {
      ...ReportedCompanyChatEntity.toJsonResponse(result),
      author: User.toJsonResponse(user.values).nickName || 'Unknown',
    };
  }

  private async checkUserChatLimit(userId: number) {
    const userLimits = this.configService.get<UserLimits>('userLimits');
    const chatsCreatedToday = await this.countService.execute(userId);

    console.log(userLimits, chatsCreatedToday);
    if (userLimits && chatsCreatedToday >= userLimits.messageLimit) {
      throw new ForbiddenException(
        'User has reached the maximum number of chat messages allowed for today.',
      );
    }
  }
}
