import {
  NumberIn,
  StartsWith,
  StringContains,
  StringIn,
} from '@shared/interfaces/prisma-query.interfaces';

export interface ReportedCompanyWhere {
  id?: number | NumberIn;
  name?: string | StringIn | StartsWith | StringContains;
}
