import { IsNumber } from 'class-validator';

export class CompanySearchDto {
  @IsNumber()
  reportedCompanyId: number;
}
