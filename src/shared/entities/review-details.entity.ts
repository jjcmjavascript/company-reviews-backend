export interface ReviewDetailPrimitive {
  id: number;
  categoryId: number;
  description?: string;
  score: number;
  reviewId: number;
}

export class ReviewDetail {
  private attributes: ReviewDetailPrimitive;

  constructor(readonly detail: ReviewDetailPrimitive) {
    this.attributes = detail;
  }

  static create(detail: Partial<ReviewDetailPrimitive>): ReviewDetail {
    return new ReviewDetail({
      id: detail.id,
      categoryId: detail.categoryId,
      description: detail.description,
      score: detail.score,
      reviewId: detail.reviewId,
    });
  }

  toPrimitive(): ReviewDetailPrimitive {
    return this.attributes;
  }

  static fromArray(details: Array<ReviewDetailPrimitive>): Array<ReviewDetail> {
    return details.map((detail) => new ReviewDetail(detail));
  }

  static toJsonResponse(
    reviewDetail: ReviewDetailPrimitive,
  ): Partial<ReviewDetailPrimitive> {
    return {
      id: reviewDetail.id,
			categoryId: reviewDetail.categoryId,
			score: reviewDetail.score,
			reviewId: reviewDetail.reviewId,
    }
  }

  static fromArrayToJsonResponse(
    details: Array<ReviewDetailPrimitive>,
  ): Array<ReviewDetailPrimitive> {
    return details.map((detail) => ({
      id: detail.id,
      categoryId: detail.categoryId,
      description: detail.description,
      score: detail.score,
      reviewId: detail.reviewId,
    }));
  }

  get values() {
    return this.attributes;
  }
}
