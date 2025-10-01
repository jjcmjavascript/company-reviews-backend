import { Injectable } from '@nestjs/common';
import { ReportedCompanyChatFindAllRepository } from '../repositories/reported-company-chat-find-all.repository';

@Injectable()
export class ReportedCompanyChatFindAllService {
  constructor(private readonly findAll: ReportedCompanyChatFindAllRepository) {}

  async execute(reportedCompanyId?: number, userId?: number) {
    const result = await this.findAll.execute(reportedCompanyId, userId);

    return result.map((chat) => ({
      ...chat,
      author: chat.user?.nickName || 'Unknown',
      user: undefined,
    }));
  }
}
