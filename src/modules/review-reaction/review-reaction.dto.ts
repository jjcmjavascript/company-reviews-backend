import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsPositive } from 'class-validator';

export class ReviewReactionCreateDto {
  @IsInt()
  @IsPositive()
  reviewId: number;

  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  type: boolean;
}

export class ReviewReactionUpdateDto {
  @IsInt()
  @IsPositive()
  id: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value ? Boolean(value) : undefined))
  type?: boolean;
}

export class ReviewReactionListDto {
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  reviewId: number;
}
