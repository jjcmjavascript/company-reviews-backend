import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReportedCompanyChatCountRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: number): Promise<number> {
    const startOfDay = new Date();
    const endOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prismaService.reportedCompanyChat.count({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
  }
}
