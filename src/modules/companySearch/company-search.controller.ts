import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CompanySearchDto } from './dto/company-search.dto';
import { CompanySearchCreateService } from './services/company-search-create.service';
import { CurrentUser, JwtUser } from '@shared/decorators/user.decorator';
import { CompanySearchFindOneRepository } from './repositories/company-search-find-one.repository';
import { CompanySearchPrimitive } from '@shared/entities/company-search.entity';

@Controller('company-search')
export class CompanySearchController {
  constructor(
    private readonly createService: CompanySearchCreateService,
    private readonly findOneService: CompanySearchFindOneRepository,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() searchDto: CompanySearchDto,
    @CurrentUser() user: JwtUser,
  ): Promise<CompanySearchPrimitive> {
    const existForTodayAndUser = await this.findOneService.execute({
      userId: user.userId,
      reportedCompanyId: searchDto.reportedCompanyId,
    });

    if (existForTodayAndUser) {
      return existForTodayAndUser;
    }

    return this.createService.execute({
      userId: user.userId,
      reportedCompanyId: searchDto.reportedCompanyId,
    });
  }
}
