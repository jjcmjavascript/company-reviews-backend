import { Injectable } from '@nestjs/common';
import { CreateReportedCompanyChatDto } from '../dto/create-reported-company-chat.dto';
import { ReportedCompanyChatCreateRepository } from '../repositories/reported-company-chat-create.repository';
import { DefaultLogger } from '@shared/services/logger.service';
import {
  ReportedCompanyChatEntity,
  ReportedCompanyChatPrimitive,
} from '@shared/entities/reportedCompanyChat.entity';
import { UserFindOneInternalService } from '@modules/users/services/user-find-one-internal.service';
import { User } from '@shared/entities/user.entity';

@Injectable()
export class ReportedCompanyChatCreateService {
  private logger = new DefaultLogger(ReportedCompanyChatCreateService.name);

  constructor(
    private readonly reportedCompanyChatCreateRepository: ReportedCompanyChatCreateRepository,
    private readonly userFindService: UserFindOneInternalService,
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

    if (!userId) {
      throw new Error('User must be logged in to create a chat message.');
    }

    const { message, reportedCompanyId } = createReportedCompanyChatDto;

    const result = await this.reportedCompanyChatCreateRepository.execute({
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
      author: User.toJsonResponse(user.values).nickname || 'Unknown',
    };
  }
}
