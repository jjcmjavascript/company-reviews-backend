import { PaginateDto } from '@shared/dto/paginate.dto';
import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ReportedCompanySearchServiceDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  name: string;
}

export class ReportedCompanyListServiceDto extends PaginateDto {
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order?: string;

  @IsOptional()
  @IsString()
  @IsIn(['verifiedScore', 'unverifiedScore', 'name', 'id'])
  orderBy?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  name: string;
}

export class ReportedCompanyCreateDto {
  @IsString()
  @MaxLength(150)
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  @MinLength(3)
  tax?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  @MinLength(10)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  @MinLength(6)
  imageUrl: string;
}

export class ReportedCompanySearchDto {
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  search: string;
}
