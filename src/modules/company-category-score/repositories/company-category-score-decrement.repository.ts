import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CompanyCategoryScorePrimitive } from '@shared/entities/company-category-score.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class CompanyCategoryScoreDecrementRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    tx: Prisma.TransactionClient,
    {
      reportedCompanyId,
      details,
      verificationStatus,
    }: {
      reportedCompanyId: number;
      details: { categoryId: number; score: number }[];
      verificationStatus: string;
    },
  ) {
    const updates = details.map(async (detail) => {
      const record = await tx.companyCategoryScore.findFirst({
        where: {
          reportedCompanyId,
          categoryId: detail.categoryId,
        },
      });

      if (!record) return;

      const data: CompanyCategoryScorePrimitive = record;

      if (verificationStatus === 'NOT_VERIFIED') {
        const newCount = Math.max(0, record.unverifiedCount - 1);
        const newSum = Math.max(0, record.unverifiedSum - detail.score);

        data.unverifiedCount = newCount;
        data.unverifiedSum = newSum;
        data.unverifiedScore = newCount > 0 ? newSum / newCount : 0;
      } else if (verificationStatus === 'APPROVED') {
        const newCount = Math.max(0, record.verifiedCount - 1);
        const newSum = Math.max(0, record.verifiedSum - detail.score);

        data.verifiedCount = newCount;
        data.verifiedSum = newSum;
        data.verifiedScore = newCount > 0 ? newSum / newCount : 0;
      }

      await tx.companyCategoryScore.update({
        where: { id: record.id },
        data,
      });
    });

    await Promise.all(updates);
  }
}
