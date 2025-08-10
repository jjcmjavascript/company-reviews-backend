import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Tax is required' })
  tax: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @Transform(({ value }) => (value ? value.toString().trim() : null))
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}

export class UserWhereDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  tax: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;
}
