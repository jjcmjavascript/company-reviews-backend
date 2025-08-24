import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserDailyReviewRepository } from './user-daily-review.repository';
import { UserDailyReviewEntity } from '@shared/entities/user-daily-review.entity';

@Injectable()
export class UserDailyReviewService {
  constructor(private readonly repository: UserDailyReviewRepository) {}

  async findAllByUserIdForToday(userId: number) {
    const reviews = await this.repository.findByUserIdForToday(userId);
    return UserDailyReviewEntity.fromArrayToJsonResponse(reviews);
  }

  async create(data: { userId: number; reviewId: number }) {
    const todaysReviews = await this.repository.findByUserIdForToday(
      data.userId,
    );

    if (todaysReviews.length >= 2) {
      throw new ForbiddenException(
        'User has already submitted the maximum number of reviews for today.',
      );
    }

    const newReview = await this.repository.create(data);
    return UserDailyReviewEntity.toJsonResponse(newReview);
  }
}
