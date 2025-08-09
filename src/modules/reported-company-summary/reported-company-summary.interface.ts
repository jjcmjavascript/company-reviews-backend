import { NumberIn } from '@shared/interfaces/prisma-query.interfaces';

export interface ReportedCompanySummaryFindAll {
  id?: number;
  reportedCompanyId?: number | NumberIn;
}
