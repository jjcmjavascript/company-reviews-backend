import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReportedCompanyFindAllRepository } from '../repositories/reported-company-find-all.repository';

@Injectable()
export class ReportedCompanySearchService {
  private readonly logger = new Logger(ReportedCompanySearchService.name);

  constructor(private readonly repository: ReportedCompanyFindAllRepository) {}

  async execute(params: {
    name: string;
  }): Promise<{ id: number; name: string }[]> {
    try {
      const searchResult = await this.repository.execute({
        name: {
          contains: params.name,
          mode: 'insensitive',
        },
      });

      return searchResult;
    } catch (error) {
      this.logger.error(`[ReportedCompanySearchService] ${error.message}`);

      throw new InternalServerErrorException(
        'An error occurred while trying to search for the reported company.',
      );
    }
  }
}
