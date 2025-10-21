import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ReviewDetailCreateDto } from '@modules/review-details/dto/review-detail-create.dto';
import { ReviewConstants } from '../review.constansts';

export class ReviewCreateDto {
  @IsNotEmpty({ message: 'Company is required' })
  @IsInt({ message: 'Company ID must be an integer' })
  reportedCompanyId: number;

  @IsNotEmpty({ message: 'Reviewer type is required' })
  @IsInt({ message: 'Reviewer type ID must be an integer' })
  reviewerTypeId: number;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  @MinLength(ReviewConstants.MIN_DESCRIPTION_LENGTH, {
    message: 'Description must be at least 10 characters long',
  })
  @MaxLength(ReviewConstants.MAX_DESCRIPTION_LENGTH, {
    message: 'Description must be at most 400 characters long',
  })
  description: string;

  @IsArray({ message: 'Review details are required' })
  @ArrayNotEmpty({ message: 'Review details are required' })
  @ArrayUnique({ message: 'Review details must be unique' })
  @ValidateNested({ each: true })
  @Type(() => ReviewDetailCreateDto)
  reviewDetails: Array<ReviewDetailCreateDto>;
}
