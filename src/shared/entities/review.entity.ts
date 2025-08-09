import { ReviewVerificationStatus } from '@shared/enums/commons.enum';
import { ReviewDetailPrimitive } from './review-details.entity';
import { UserPrimitive } from './user.entity';

export interface ReviewPrimitive {
  id: number;
  userId: number;
  reportedCompanyId: number;
  reviewerTypeId: number;
  description: string;
  verificationStatus: ReviewVerificationStatus;
  reviewDetails?: Array<Partial<ReviewDetailPrimitive>>;
  user?: Partial<UserPrimitive>;
  createdAt: Date;
  deletedAt?: Date;
}

export class Review {
  private attributes: ReviewPrimitive;

  constructor(readonly review: ReviewPrimitive) {
    this.attributes = review;
  }

  static create(review: Partial<ReviewPrimitive>): Review {
    return new Review({
      id: review.id,
      userId: review.userId,
      reportedCompanyId: review.reportedCompanyId,
      reviewerTypeId: review.reviewerTypeId,
      description: review.description,
      verificationStatus: review.verificationStatus,
      createdAt: review.createdAt,
      deletedAt: review.deletedAt,
    });
  }

  toPrimitive(): ReviewPrimitive {
    return this.attributes;
  }

  static fromArray(reviews: Array<ReviewPrimitive>): Array<Review> {
    return reviews.map((review) => new Review(review));
  }

  static toJsonResponse(review: ReviewPrimitive): Partial<ReviewPrimitive> {
    return {
      id: review.id,
      userId: review.userId,
      reportedCompanyId: review.reportedCompanyId,
      reviewerTypeId: review.reviewerTypeId,
      description: review.description,
      verificationStatus: review.verificationStatus,
      createdAt: review.createdAt,
      user: review.user,
      reviewDetails: review.reviewDetails,
    };
  }

  static fromArrayToReviewJsonResponse(
    reviews: Array<ReviewPrimitive>,
  ): Array<Partial<ReviewPrimitive>> {
    return reviews.map((review) => {
      return {
        id: review.id,
        userId: review.userId,
        reportedCompanyId: review.reportedCompanyId,
        reviewerTypeId: review.reviewerTypeId,
        description: review.description,
        verificationStatus: review.verificationStatus,
        createdAt: review.createdAt,
        user: review.user,
        reviewDetails: review.reviewDetails,
      };
    });
  }

  get values() {
    return this.attributes;
  }
}
