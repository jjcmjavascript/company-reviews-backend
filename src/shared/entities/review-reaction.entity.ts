import { ReactionType } from '@shared/enums/commons.enum';

export interface ReviewReactionPrimivitive {
  id: number;
  userId: number;
  reviewId: number;
  type: ReactionType;
  createdAt: Date;
  deletedAt?: Date;
}

export class ReviewReaction {
  private attributes: ReviewReactionPrimivitive;

  constructor(readonly like: ReviewReactionPrimivitive) {
    this.attributes = like;
  }

  static create(data: Partial<ReviewReactionPrimivitive>): ReviewReaction {
    return new ReviewReaction({
      id: data.id!,
      type: data.type ?? ReactionType.LIKE,
      userId: data.userId!,
      reviewId: data.reviewId!,
      createdAt: data.createdAt ?? new Date(),
      deletedAt: data.deletedAt,
    });
  }

  toPrimitive(): ReviewReactionPrimivitive {
    return this.attributes;
  }

  static fromArray(list: ReviewReactionPrimivitive[]): ReviewReaction[] {
    return list.map((item) => new ReviewReaction(item));
  }

  get values() {
    return this.attributes;
  }
}
