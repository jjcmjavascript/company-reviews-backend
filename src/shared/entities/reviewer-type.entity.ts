export interface ReviewerTypePrimitive {
  id: number;
  name: string;
  deletedAt?: Date;
}

export class ReviewerType {
  private attributes: ReviewerTypePrimitive;

  constructor(readonly reviewerType: ReviewerTypePrimitive) {
    this.attributes = reviewerType;
  }

  static create(reviewerType: Partial<ReviewerTypePrimitive>): ReviewerType {
    return new ReviewerType({
      id: reviewerType.id!,
      name: reviewerType.name!,
      deletedAt: reviewerType.deletedAt,
    });
  }

  toPrimitive(): ReviewerTypePrimitive {
    return this.attributes;
  }

  static fromArray(
    reviewerTypes: Array<ReviewerTypePrimitive>,
  ): Array<ReviewerType> {
    return reviewerTypes.map((reviewerType) => new ReviewerType(reviewerType));
  }

  get values() {
    return this.attributes;
  }
}
