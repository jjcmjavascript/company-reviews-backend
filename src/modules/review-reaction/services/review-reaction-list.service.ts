import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewReactionListService {
  async execute({ reviewId }: { reviewId: number }) {
    console.log(reviewId);
  }
}
