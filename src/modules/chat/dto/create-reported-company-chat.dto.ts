import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReportedCompanyChatDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  reportedCompanyId: number;
}
