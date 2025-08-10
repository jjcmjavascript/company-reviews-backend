import { IsNumber } from 'class-validator';

export class ReviewerTypeCategoryDto {
  @IsNumber()
  reviewerTypeId: number;

  @IsNumber()
  categoryId: number;
}
