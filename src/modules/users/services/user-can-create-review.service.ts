import { Injectable } from '@nestjs/common';
import { UserCanCreateReviewRepository } from '../repositories/user-can-create-review.repository';

@Injectable()
export class UserCanCreateReviewService {
  constructor(
    private readonly userCanCreateReviewRepository: UserCanCreateReviewRepository,
  ) {}

  async execute(userId: number, reportedCompanyId: number): Promise<boolean> {
    const result = await this.userCanCreateReviewRepository.execute(
      userId,
      reportedCompanyId,
    );

    return result;
  }
}
