import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReportedCompanyChatService } from './reported-company-chat.service';
import { CreateReportedCompanyChatDto } from './dto/create-reported-company-chat.dto';
import { AuthGuard } from '@nestjs/passport'; // Assuming JWT auth

@Controller('reported-company-chats')
export class ReportedCompanyChatController {
  constructor(
    private readonly reportedCompanyChatService: ReportedCompanyChatService,
  ) {}

  @UseGuards(AuthGuard('jwt')) // Protect route
  @Post()
  create(
    @Body() createReportedCompanyChatDto: CreateReportedCompanyChatDto,
    @Req() req,
  ) {
    const userId = req.user.id; // Assuming user id is in request
    return this.reportedCompanyChatService.create(
      createReportedCompanyChatDto,
      userId,
    );
  }

  @Get('company/:reportedCompanyId')
  findAllForCompany(@Param('reportedCompanyId') reportedCompanyId: string) {
    return this.reportedCompanyChatService.findAllForCompany(
      +reportedCompanyId,
    );
  }
}
