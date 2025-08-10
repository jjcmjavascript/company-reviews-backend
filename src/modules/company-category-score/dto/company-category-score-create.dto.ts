import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  ValidateNested,
} from 'class-validator';

class ReviewCreateDto {
  reportedCompanyId: number;
  verificationStatus: string;
}

class ReviewDetailsCreateDto {
  categoryId: number;
  score: number;
}

export class CompanyCategoryScoreCreateDto {
  @Type(() => ReviewCreateDto)
  review: ReviewCreateDto;

  @IsArray({ message: 'Review details are required' })
  @ArrayNotEmpty({ message: 'Review details are required' })
  @ArrayUnique({ message: 'Review details must be unique' })
  @ValidateNested({ each: true })
  @Type(() => ReviewDetailsCreateDto)
  reviewDetails: Array<ReviewDetailsCreateDto>;
}
