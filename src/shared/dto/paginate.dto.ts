import { DEFUALT_PAGINATE } from '@shared/constants/paginate.constant';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, Min, IsPositive } from 'class-validator';

export class PaginateDto {
  @IsOptional()
  @Transform(({ value }) => {
    return Number.isNaN(Number(value))
      ? DEFUALT_PAGINATE.page
      : Math.abs(Number(value));
  })
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }) => {
    return Number.isNaN(Number(value))
      ? DEFUALT_PAGINATE.limit
      : Math.abs(Number(value));
  })
  @IsNumber()
  @IsPositive()
  limit?: number;
}
