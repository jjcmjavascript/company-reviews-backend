import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ReviewDetailCreateDto {
  @IsNotEmpty({ message: 'Category ID is required' })
  @IsInt({ message: 'Category ID must be an integer' })
  categoryId: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(400, {
    message: 'Description must be at most 400 characters long',
  })
  description?: string;

  @IsNotEmpty({ message: 'Score is required' })
  @IsInt({ message: 'Score must be an integer' })
  @Min(1, { message: 'Score must be at least 1' })
  @Max(5, { message: 'Score must be at most 5' })
  score: number;
}
