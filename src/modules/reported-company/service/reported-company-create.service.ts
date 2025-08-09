import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReportedCompanyCreateRepository } from '../repositories/reported-company-create.repository';
import {
  ReportedCompany,
  ReportedCompanyPrimitive,
} from '@shared/entities/reported-company.entity';

@Injectable()
export class ReportedCompanyCreateService {
  private readonly logger = new Logger(ReportedCompanyCreateService.name);
  constructor(
    private readonly reportedCompanyCreateService: ReportedCompanyCreateRepository,
  ) {}

  async execute(
    params: Omit<Partial<ReportedCompanyPrimitive>, 'imageUrl' | 'createdAt'>,
  ): Promise<ReportedCompanyPrimitive> {
    try {
      const result = await this.reportedCompanyCreateService.execute(params);

      return ReportedCompany.create(result).values;
    } catch (error: unknown) {
      this.logger.error({
        message: 'Error on create reported company',
        error: (error as Error).message,
      });

      throw new InternalServerErrorException(
        'Error on create reported company',
      );
    }
  }
}
