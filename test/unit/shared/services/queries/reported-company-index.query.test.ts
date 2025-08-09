import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReportedCompanyListQuery } from '@shared/services/queries/reported-company-index.query';
import { mockDeep } from 'jest-mock-extended';

describe('ReportedCompanyListQuery', () => {
  let query: ReportedCompanyListQuery;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportedCompanyListQuery,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
      ],
    }).compile();

    query = module.get<ReportedCompanyListQuery>(ReportedCompanyListQuery);
    prismaService = module.get(PrismaService);
  });

  it('debe retornar una lista de compañías reportadas paginadas', async () => {
    const mockCompanies = [
      { id: 1, name: 'Empresa A', score: 4.5, type: 'Fraude' },
      { id: 2, name: 'Empresa B', score: 3.8, type: 'Estafa' },
    ];

    jest.spyOn(prismaService.category, 'count').mockResolvedValue(2);

    prismaService.$queryRaw.mockResolvedValue(mockCompanies);

    const result = await query.execute({ from: 0, limit: 20 });

    expect(result).toEqual(mockCompanies);
    expect(prismaService.$queryRaw).toHaveBeenCalledTimes(1);
  });
});
