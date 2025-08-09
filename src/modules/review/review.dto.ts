import { IsNumber, IsOptional } from 'class-validator';

export class ReviewDto {
  @IsNumber()
  @IsOptional()
  reportedCompanyId: number;
}
