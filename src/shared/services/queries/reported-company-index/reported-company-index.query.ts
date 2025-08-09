import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { calculatePaginateOffset } from '@shared/helpers/paginate.helper';
import {
  ReportedCompanyPaginatedQueryParams,
  ReportedCompanyPaginatedQueryResult,
  ReportedCompanyPaginatedQueryResultItem,
} from './reported-company-index.query.interface';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReportedCompanyListQuery {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({
    page = 1,
    limit = 6,
    orderBy = 'id',
    order = 'ASC',
    name,
  }: ReportedCompanyPaginatedQueryParams): Promise<ReportedCompanyPaginatedQueryResult> {
    const totalCompanies = await this.prismaService.reportedCompany.count({
      where: {
        deletedAt: null,
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
    });

    const offset = calculatePaginateOffset(page, limit);
    const safeName = `%${name}%`;

    // 2) Consulta RAW: agrupa por compañía y promedia verifiedScore/unverifiedScore
    const data = await this.prismaService.$queryRaw<
      ReportedCompanyPaginatedQueryResultItem[]
    >(
      Prisma.sql`
    SELECT
      rc.id,
      rc.name,
      rc."imageUrl"    AS "imageUrl",
      rc.tax           AS tax,
      ROUND(AVG(ccs."verifiedScore")::numeric, 2)::float AS "avgVerifiedScore",
      ROUND(AVG(ccs."unverifiedScore")::numeric, 2)::float AS "avgUnverifiedScore"
    FROM "ReportedCompany" rc
    JOIN "CompanyCategoryScore" ccs
      ON ccs."reportedCompanyId" = rc.id
    WHERE rc."deletedAt" IS NULL
      ${name ? Prisma.sql`AND rc.name ILIKE ${safeName}` : Prisma.empty}
    GROUP BY rc.id
    ORDER BY ${Prisma.raw(this.getOrderBySqlExpression(orderBy, order))}
    LIMIT ${limit}
    OFFSET ${offset};
  `,
    );

    const totalPages = Math.ceil(totalCompanies / limit);

    return {
      page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      totalPages,
      data,
    };
  }

  private getOrderBySqlExpression(orderBy: string, order: string): string {
    switch (orderBy) {
      case 'name':
        return `UPPER(rc.name) ${order}, rc.id ${order}`;
      case 'verifiedScore':
        return `"avgVerifiedScore" ${order}, rc.id ${order}`;
      case 'unverifiedScore':
        return `"avgUnverifiedScore" ${order}, rc.id ${order}`;
      default:
        return `rc.id ${order}`;
    }
  }
}
