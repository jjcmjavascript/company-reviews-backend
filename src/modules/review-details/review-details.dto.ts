import { NumberIn } from '@shared/interfaces/prisma-query.interfaces';

export interface ReviewDetailsFindAll {
  reportedCompanyId: number | NumberIn;
}
