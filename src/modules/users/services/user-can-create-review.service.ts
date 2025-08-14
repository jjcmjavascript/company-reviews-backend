import { Injectable } from '@nestjs/common';
import { UserCanCreateReviewRepository } from '../repositories/user-can-create-review.repository';
import { JwtUser } from '@shared/decorators/user.decorator';

@Injectable()
export class UserCanCreateReviewService {
  constructor(
    private readonly userCanCreateReviewRepository: UserCanCreateReviewRepository,
  ) {}

  async execute(
    user: JwtUser | null,
    reportedCompanyId: number,
  ): Promise<boolean> {
    if (user) {
      const result = await this.userCanCreateReviewRepository.execute(
        user.userId,
        reportedCompanyId,
      );

      return result;
    }

    return false;
  }
}
