import { Injectable } from '@nestjs/common';
import { CompanyCategoryScoreCreateRepository } from '../repositories/company-category-score-create.repository';
import { CompanyCategoryScoreEntity } from '@shared/entities/company-category-score.entity';
import { CompanyCategoryScoreCreateDto } from '../dto/company-category-score-create.dto';

@Injectable()
export class CompanyCategoryScoreCreateService {
  constructor(
    private readonly companyCategoryScoreCreateRepository: CompanyCategoryScoreCreateRepository,
  ) {}

  async execute(data: CompanyCategoryScoreCreateDto) {
    const result = await this.companyCategoryScoreCreateRepository.execute(
      data.reviewDetails,
      {
        reportedCompanyId: data.review.reportedCompanyId,
        verificationStatus: data.review.verificationStatus,
      },
    );

    return CompanyCategoryScoreEntity.toJsonResponse(result);
  }
}
