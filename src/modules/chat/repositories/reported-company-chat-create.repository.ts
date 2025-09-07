import { Injectable } from '@nestjs/common';
import { ReportedCompanyChatPrimitive } from '@shared/entities/reportedCompanyChat.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReportedCompanyChatCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  execute(
    data: Omit<
      ReportedCompanyChatPrimitive,
      'id' | 'createdAt' | 'updatedAt' | 'user' | 'author'
    >,
  ) {
    return this.prismaService.reportedCompanyChat.create({
      data,
    });
  }
}
