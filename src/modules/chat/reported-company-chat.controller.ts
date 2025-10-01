import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateReportedCompanyChatDto } from './dto/create-reported-company-chat.dto';
import { ReportedCompanyChatCreateService } from './services/reported-company-chat-create.service';
import { CurrentUser, JwtUser } from '@shared/decorators/user.decorator';
import { Loged } from '@shared/decorators/loged.decorator';
import { ReportedCompanyChatFindAllService } from './services/reported-company-find-all.service';

@Controller('reported-company-chats')
export class ReportedCompanyChatController {
  constructor(
    private readonly createService: ReportedCompanyChatCreateService,
    private readonly findAllService: ReportedCompanyChatFindAllService,
  ) {}

  @Post()
  @Loged()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createReportedCompanyChatDto: CreateReportedCompanyChatDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.createService.execute(
      createReportedCompanyChatDto,
      user.userId,
    );
  }

  @Get('company/:reportedCompanyId')
  @HttpCode(HttpStatus.OK)
  findAllForCompany(
    @Param('reportedCompanyId', ParseIntPipe) reportedCompanyId: number,
  ) {
    return this.findAllService.execute(reportedCompanyId);
  }
}
