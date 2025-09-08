import { Injectable } from '@nestjs/common';
import { ReportedCompanyChatFindAllRepository } from '../repositories/reported-company-chat-find-all.repository';

@Injectable()
export class ReportedCompanyChatFindAllService {
  constructor(private readonly findAll: ReportedCompanyChatFindAllRepository) {}

  async execute(reportedCompanyId?: number, userId?: number) {
    return this.findAll.execute(reportedCompanyId, userId);
  }
}
