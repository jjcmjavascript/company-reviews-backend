import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ReviewerTypeDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
