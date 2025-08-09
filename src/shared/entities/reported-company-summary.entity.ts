export interface ReportedCompanySummaryPrimitive {
  id: number;
  reportedCompanyId: number;
  calculatedSummary: string | null;
  createdAt: Date;
}

export class ReportedCompanySummaryEntity {
  private attributes: ReportedCompanySummaryPrimitive;

  constructor(readonly company: ReportedCompanySummaryPrimitive) {
    this.attributes = company;
  }

  static create(
    company: Partial<ReportedCompanySummaryPrimitive>,
  ): ReportedCompanySummaryEntity {
    return new ReportedCompanySummaryEntity({
      id: company.id,
      reportedCompanyId: company.reportedCompanyId,
      createdAt: company.createdAt,
      calculatedSummary: company.calculatedSummary,
    });
  }

  toPrimitive(): ReportedCompanySummaryPrimitive {
    return this.attributes;
  }

  static fromArrayToResponseJson(
    companies: Array<Partial<ReportedCompanySummaryPrimitive>>,
  ): Array<ReportedCompanySummaryPrimitive> {
    return companies.map((company) => {
      return {
        id: company.id,
        reportedCompanyId: company.reportedCompanyId,
        createdAt: company.createdAt,
        calculatedSummary: company.calculatedSummary,
      };
    });
  }

  get values() {
    return {
      id: this.attributes.id,
      reportedCompanyId: this.attributes.reportedCompanyId,
      createdAt: this.attributes.createdAt,
      calculatedSummary: this.attributes.calculatedSummary,
    };
  }
}
