import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { ReviewDetailCreateDto } from '@modules/review-details/dto/review-detail-create.dto';

export class ReviewCreateDto {
  @IsOptional()
  @IsInt({ message: 'User ID must be an integer' })
  userId: number;

  @IsNotEmpty({ message: 'Company is required' })
  @IsInt({ message: 'Company ID must be an integer' })
  reportedCompanyId: number;

  @IsNotEmpty({ message: 'Reviewer type is required' })
  @IsInt({ message: 'Reviewer ID must be an integer' })
  reviewerTypeId: number;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(400, { message: 'Description must be at most 400 characters long' })
  description: string;

  @IsNotEmpty({ message: 'Review details are required' })
  @ValidateNested({ each: true })
  @Type(() => ReviewDetailCreateDto)
  reviewDetails: Array<ReviewDetailCreateDto>;
}
