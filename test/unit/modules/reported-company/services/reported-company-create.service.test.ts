import { ReportedCompanyCreateRepository } from '@modules/reported-company/repositories/reported-company-create.repository';
import { ReportedCompanyCreateService } from '@modules/reported-company/service/reported-company-create.service';
import { ReportedCompany } from '@shared/entities/reported-company.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { mock } from 'jest-mock-extended';

describe('[Service] ReportedCompanyCreateService', () => {
  let reportedCompanyCreateService: ReportedCompanyCreateService;
  let reportedCompanyCreateRepository: ReportedCompanyCreateRepository;

  beforeAll(async () => {
    const prismaService = mock<PrismaService>();

    reportedCompanyCreateRepository = new ReportedCompanyCreateRepository(
      prismaService,
    );

    reportedCompanyCreateService = new ReportedCompanyCreateService(
      reportedCompanyCreateRepository,
    );
  });

  it('should be defined', () => {
    expect(reportedCompanyCreateService).toBeDefined();
  });

  it('should create a reported company', async () => {
    const reportedCompany = {
      name: 'Company',
    };

    jest
      .spyOn(reportedCompanyCreateRepository, 'execute')
      .mockResolvedValueOnce({ ...reportedCompany, id: 1 });

    const result = await reportedCompanyCreateService.execute(reportedCompany);

    expect(result.values).toEqual(
      ReportedCompany.create({ ...reportedCompany, id: 1 }).values,
    );
  });

  it('should return internal server error if is not created', async () => {
    const reportedCompany = {
      name: 'Company',
    };

    jest
      .spyOn(reportedCompanyCreateRepository, 'execute')
      .mockReturnValueOnce(Promise.resolve(null));

    expect(
      reportedCompanyCreateService.execute(reportedCompany),
    ).rejects.toThrow('Error on create reported company');
  });
});
