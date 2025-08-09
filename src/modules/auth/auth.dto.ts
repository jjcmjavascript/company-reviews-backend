import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Password must be a string' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}

export class RegisterDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @Matches(/^(?!\s*$)[a-zA-Z\s]+$/, {
    message: 'Name must contain letters and cannot be only spaces',
  })
  name: string;
}
