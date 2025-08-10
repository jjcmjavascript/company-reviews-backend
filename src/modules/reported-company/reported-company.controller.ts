import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ReportedCompanyCreateDto,
  ReportedCompanySearchServiceDto,
  ReportedCompanyListServiceDto,
} from './reported-company.dto';
import { HasRoles } from '@shared/decorators/user-roles.decorator';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { ReportedCompanyCreateService } from './service/reported-company-create.service';
import { ReportedCompanySearchService } from './service/reported-company-search.service';
import { ReportedCompanyFindService } from './service/reported-company-find.service';
import { Loged } from '@shared/decorators/loged.decorator';
import { ReportedCompanyListService } from './service/reported-company-list.service';

@Controller('companies')
export class ReportedCompanyController {
  constructor(
    private readonly reportedCompanyListService: ReportedCompanyListService,
    private readonly reportedCompanyCreateService: ReportedCompanyCreateService,
    private readonly reportedCompanySearchService: ReportedCompanySearchService,
    private readonly reportedCompanyFindService: ReportedCompanyFindService,
  ) {}

  @Get()
  async search(@Query() params: ReportedCompanySearchServiceDto) {
    return await this.reportedCompanySearchService.execute(params);
  }

  @Get('list')
  async list(@Query() params: ReportedCompanyListServiceDto) {
    return await this.reportedCompanyListService.execute(params);
  }

  @Post()
  @Loged()
  @HasRoles(Roles.Admin)
  async create(@Body() params: ReportedCompanyCreateDto) {
    return await this.reportedCompanyCreateService.execute(params);
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.reportedCompanyFindService.execute({ id });
  }
}
