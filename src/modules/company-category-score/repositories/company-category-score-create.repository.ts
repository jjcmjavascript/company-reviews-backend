import { Injectable } from '@nestjs/common';
import { ReviewVerificationStatus } from '@shared/enums/commons.enum';
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
    const categoriesIds = reviewDetails.map((detail) => detail.categoryId);
    const previousScores =
      await this.prismaService.companyCategoryScore.findMany({
        where: {
          reportedCompanyId: review.reportedCompanyId,
          categoryId: {
            in: categoriesIds,
          },
        },
      });

    const toProcess: Promise<any>[] = [];
    //TODO: verificar que esto este correcto, ademas volver a pensar que hacer con los verificados
    for (const detail of reviewDetails) {
      const previousScore = previousScores.find(
        (score) => score.categoryId === detail.categoryId,
      );

      if (previousScore) {
        const unverifiedSum =
          review.verificationStatus === ReviewVerificationStatus.NOT_VERIFIED
            ? previousScore.unverifiedSum + detail.score
            : previousScore.unverifiedSum;
        const unverifiedCount =
          review.verificationStatus === ReviewVerificationStatus.NOT_VERIFIED
            ? previousScore.unverifiedCount + 1
            : previousScore.unverifiedCount;

        const unverifiedScore =
          review.verificationStatus === ReviewVerificationStatus.NOT_VERIFIED
            ? unverifiedSum / unverifiedCount
            : previousScore.unverifiedScore;

        const verifiedSum =
          review.verificationStatus === ReviewVerificationStatus.APPROVED
            ? previousScore.verifiedSum + detail.score
            : previousScore.verifiedSum;
        const verifiedCount =
          review.verificationStatus === ReviewVerificationStatus.APPROVED
            ? previousScore.verifiedCount + 1
            : previousScore.verifiedCount;

        const verifiedScore =
          review.verificationStatus === ReviewVerificationStatus.APPROVED
            ? verifiedSum / verifiedCount
            : previousScore.verifiedScore;

        toProcess.push(
          this.prismaService.companyCategoryScore.update({
            where: {
              id: previousScore.id,
            },
            data: {
              unverifiedSum,
              unverifiedCount,
              unverifiedScore,
              verifiedSum,
              verifiedCount,
              verifiedScore,
            },
          }),
        );
      }
    }

    await Promise.all(toProcess);

    return this.prismaService.companyCategoryScore.findMany({
      where: {
        reportedCompanyId: review.reportedCompanyId,
        categoryId: {
          in: categoriesIds,
        },
      },
    });
  }
}
