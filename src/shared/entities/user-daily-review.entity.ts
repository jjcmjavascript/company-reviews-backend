export interface UserDailyReviewPrimitive {
  id: number;
  userId: number;
  reviewId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UserDailyReviewEntity {
  constructor(private readonly attributes: UserDailyReviewPrimitive) {}

  get values(): UserDailyReviewPrimitive {
    return this.attributes;
  }

  static fromArrayToJsonResponse(
    data: Partial<UserDailyReviewPrimitive>[],
  ): Partial<UserDailyReviewPrimitive>[] {
    return data.map((item) => ({
      id: item.id,
      userId: item.userId,
      reviewId: item.reviewId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }

  static toJsonResponse(
    data: Partial<UserDailyReviewPrimitive>,
  ): Partial<UserDailyReviewPrimitive> {
    return {
      id: data.id,
      userId: data.userId,
      reviewId: data.reviewId,
    };
  }
}
