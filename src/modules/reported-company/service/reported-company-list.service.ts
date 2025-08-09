import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { ReportedCompanyListServiceDto } from '../reported-company.dto';
import { ReportedCompanyListQuery } from '@shared/services/queries/reported-company-index/reported-company-index.query';
import {
  OrderByField,
  ReportedCompanyPaginatedQueryResult,
} from '@shared/services/queries/reported-company-index/reported-company-index.query.interface';
import { OrderDirection } from '@shared/interfaces/prisma-query.interfaces';

@Injectable()
export class ReportedCompanyListService {
  private logger = new Logger(ReportedCompanyListService.name);

  constructor(private readonly repository: ReportedCompanyListQuery) {}

  async execute(
    params: ReportedCompanyListServiceDto,
  ): Promise<ReportedCompanyPaginatedQueryResult> {
    try {
      const { limit = 6, order, orderBy } = params;

      const queryResult = await this.repository.execute({
        limit,
        order: order as OrderDirection,
        orderBy: orderBy as OrderByField,
      });

      return queryResult;
    } catch (e: unknown) {
      this.logger.error({
        message: 'Error when listing reported companies',
        error: e,
        params,
      });

      throw new InternalServerErrorException(
        'An error happened when list was loading',
      );
    }
  }
}
