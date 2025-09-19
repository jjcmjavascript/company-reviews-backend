import { Injectable } from '@nestjs/common';
import { CompanySearchCreateRepository } from '../repositories/company-search-create.repository';

@Injectable()
export class CompanySearchCreateService {
  constructor(private readonly repository: CompanySearchCreateRepository) {}

  execute(searchDto: { userId: number; reportedCompanyId: number }) {
    return this.repository.execute(searchDto);
  }
}
