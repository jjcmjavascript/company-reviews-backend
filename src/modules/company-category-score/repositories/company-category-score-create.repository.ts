import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class CompanyCategoryScoreCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    reviewDetails: {
      categoryId: number;
      score: number;
    }[],
    review: {
      reportedCompanyId: number;
      verificationStatus: string;
    },
  ) {
    return this.prismaService.$transaction(async (tx) => {
      for (const d of reviewDetails) {
        const isVerified = review.verificationStatus === 'APPROVED';

        return await tx.companyCategoryScore.upsert({
          where: {
            reportedCompanyId_categoryId: {
              reportedCompanyId: review.reportedCompanyId,
              categoryId: d.categoryId,
            },
          },
          create: {
            reportedCompanyId: review.reportedCompanyId,
            categoryId: d.categoryId,
            verifiedCount: isVerified ? 1 : 0,
            verifiedSum: isVerified ? d.score : 0,
            unverifiedCount: isVerified ? 0 : 1,
            unverifiedSum: isVerified ? 0 : d.score,
            verifiedScore: isVerified ? d.score : 0,
            unverifiedScore: isVerified ? 0 : d.score,
          },
          update: {
            verifiedCount: { increment: isVerified ? 1 : 0 },
            verifiedSum: { increment: isVerified ? d.score : 0 },
            unverifiedCount: { increment: isVerified ? 0 : 1 },
            unverifiedSum: { increment: isVerified ? 0 : d.score },
            verifiedScore: {
              set: tx.$executeRaw`(SELECT CASE WHEN verifiedCount + ${isVerified ? 1 : 0} = 0
            THEN 0
            ELSE (verifiedSum + ${isVerified ? d.score : 0})::float / (verifiedCount + ${isVerified ? 1 : 0})
          END FROM "CompanyCategoryScore"
          WHERE "reportedCompanyId"=${review.reportedCompanyId} AND "categoryId"=${d.categoryId})` as any,
            },
            unverifiedScore: {
              set: tx.$executeRaw`(SELECT CASE WHEN unverifiedCount + ${isVerified ? 0 : 1} = 0
            THEN 0
            ELSE (unverifiedSum + ${isVerified ? 0 : d.score})::float / (unverifiedCount + ${isVerified ? 0 : 1})
          END FROM "CompanyCategoryScore"
          WHERE "reportedCompanyId"=${review.reportedCompanyId} AND "categoryId"=${d.categoryId})` as any,
            },
          },
        });
      }
    });
  }
}
