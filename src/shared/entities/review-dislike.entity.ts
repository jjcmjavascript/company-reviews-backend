export interface ReviewDislikePrimitive {
  id: number;
  userId: number;
  reviewId: number;
  createdAt: Date;
  deletedAt?: Date;
}

export class ReviewDislike {
  private attributes: ReviewDislikePrimitive;

  constructor(readonly dislike: ReviewDislikePrimitive) {
    this.attributes = dislike;
  }

  static create(data: Partial<ReviewDislikePrimitive>): ReviewDislike {
    return new ReviewDislike({
      id: data.id!,
      userId: data.userId!,
      reviewId: data.reviewId!,
      createdAt: data.createdAt ?? new Date(),
      deletedAt: data.deletedAt,
    });
  }

  toPrimitive(): ReviewDislikePrimitive {
    return this.attributes;
  }

  static fromArray(list: ReviewDislikePrimitive[]): ReviewDislike[] {
    return list.map((item) => new ReviewDislike(item));
  }

  get values() {
    return this.attributes;
  }
}
