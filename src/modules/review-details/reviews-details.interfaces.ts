import { NumberIn } from '@shared/interfaces/prisma-query.interfaces';

export interface ReviewDetailsFindTopReturn {
  reviewId: number;
  score: number;
}

export interface ReviewDetailsFindAll {
  reviewId: number | NumberIn;
}

export interface ReviewDetailsByCompany {
  reportedCompanyId?: number;
}
