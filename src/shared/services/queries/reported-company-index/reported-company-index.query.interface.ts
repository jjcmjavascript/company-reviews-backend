import { OrderDirection } from '@shared/interfaces/prisma-query.interfaces';

export interface ReportedCompanyPaginatedQueryResultItem {
  id: number;
  name: string;
  imageUrl: string | null;
  tax: string | null;
  avgVerifiedScore: number;
  avgUnverifiedScore: number;
}
export type OrderByField = 'id' | 'name' | 'verifiedScore' | 'unverifiedScore';

export interface ReportedCompanyPaginatedQueryParams {
  page?: number;
  limit?: number;
  orderBy?: OrderByField;
  order?: OrderDirection;
  name?: string;
}

export interface ReportedCompanyPaginatedQueryResult {
  page: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
  data: ReportedCompanyPaginatedQueryResultItem[];
}
