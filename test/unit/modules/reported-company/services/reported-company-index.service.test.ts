import { ReportedCompanyListQueryService } from '@modules/reported-company/service/reported-company-index.service';
import { Test } from '@nestjs/testing';
import { ReportedCompanyListQuery } from '@shared/services/queries/reported-company-index.query';
import { getPrismaMock } from '../../../mocks/prisma.service.mock';
import { getReportedCompanyPaginatedQueryResultMocks } from '../../../mocks/entities/reported-company.mock';

describe('[Service] ReportedCompanyListQueryService', () => {
  let reportedCompanyIndexQuery: ReportedCompanyListQuery;
  let reportedCompanyIndexService: ReportedCompanyListQueryService;

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        getPrismaMock(),
        ReportedCompanyListQuery,
        ReportedCompanyListQueryService,
      ],
    }).compile();

    reportedCompanyIndexQuery = ref.get(ReportedCompanyListQuery);
    reportedCompanyIndexService = ref.get(ReportedCompanyListQueryService);
  });

  it('It should return an grouped array when has data', async () => {
    const queryMocks = getReportedCompanyPaginatedQueryResultMocks();
    const spyIndexQueryService = jest.spyOn(
      reportedCompanyIndexQuery,
      'execute',
    );

    spyIndexQueryService.mockResolvedValue(queryMocks);

    const result = await reportedCompanyIndexService.execute({ id: 1 });

    expect(result[1]).toHaveProperty('name');
    expect(result[1]).toHaveProperty('id');
    expect(result[1]).toHaveProperty('evaluation');
    expect(result[1].evaluation).toHaveLength(6);
  });
});
