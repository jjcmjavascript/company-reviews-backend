import { Injectable } from '@nestjs/common';
import { CreateReportedCompanyChatDto } from '../dto/create-reported-company-chat.dto';
import { ReportedCompanyChatCreateRepository } from '../repositories/reported-company-chat-create.repository';
import { DefaultLogger } from '@shared/services/logger.service';
import { ReportedCompanyChatEntity } from '@shared/entities/reportedCompanyChat.entity';

@Injectable()
export class ReportedCompanyChatService {
  private logger = new DefaultLogger(ReportedCompanyChatService.name);

  constructor(
    private readonly reportedCompanyChatCreateRepository: ReportedCompanyChatCreateRepository,
  ) {}

  async create(
    createReportedCompanyChatDto: CreateReportedCompanyChatDto,
    userId: number,
  ) {
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

    return ReportedCompanyChatEntity.toJsonResponse(result);
  }

  // async findAllForCompany(reportedCompanyId: number) {
  //   return this.prisma.reportedCompanyChat.findMany({
  //     where: {
  //       reportedCompanyId,
  //     },
  //     include: {
  //       user: {
  //         select: {
  //           id: true,
  //           name: true,
  //         },
  //       },
  //     },
  //     orderBy: {
  //       createdAt: 'asc',
  //     },
  //   });
  // }
}
