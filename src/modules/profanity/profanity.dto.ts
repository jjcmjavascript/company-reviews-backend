import { IsString, MaxLength } from 'class-validator';

export class ProfanityDto {
  @IsString({
    message: 'Text must be a string',
  })
  @MaxLength(50, { message: 'Text must be at most 500 characters long' })
  text: string;
}
