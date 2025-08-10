export interface ReviewerTypePrimitive {
  id: number;
  name: string;
  createdAt: Date;
  deletedAt?: Date;
}

export class ReviewerType {
  private attributes: ReviewerTypePrimitive;

  constructor(readonly reviewerType: ReviewerTypePrimitive) {
    this.attributes = reviewerType;
  }

  static create(reviewerType: Partial<ReviewerTypePrimitive>): ReviewerType {
    return new ReviewerType({
      id: reviewerType.id,
      name: reviewerType.name,
      createdAt: reviewerType.createdAt,
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

  static toJsonResponse(
    reviewerType: ReviewerTypePrimitive,
  ): Partial<ReviewerTypePrimitive> {
    return {
      id: reviewerType.id,
      name: reviewerType.name,
      createdAt: reviewerType.createdAt,
    };
  }

  static fromArrayToReviewerTypeJsonResponse(
    reviewerTypes: Array<ReviewerTypePrimitive>,
  ): Array<Partial<ReviewerTypePrimitive>> {
    return reviewerTypes.map((reviewerType) => {
      return {
        id: reviewerType.id,
        name: reviewerType.name,
      };
    });
  }

  get values() {
    return this.attributes;
  }
}
