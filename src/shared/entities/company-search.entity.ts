export interface CompanySearchPrimitive {
  id?: number;
  reportedCompanyId: number;
  userId: number;
  createdAt?: Date;
}

export class CompanySearch {
  private attributes: CompanySearchPrimitive;

  get values() {
    return this.attributes;
  }

  constructor(readonly review: CompanySearchPrimitive) {
    this.attributes = review;
  }

  static toJsonResponse(
    companySearch: CompanySearchPrimitive,
  ): Partial<CompanySearchPrimitive> {
    return {
      id: companySearch.id,
      reportedCompanyId: companySearch.reportedCompanyId,
      userId: companySearch.userId,
      createdAt: companySearch.createdAt,
    };
  }

  static fromArrayToCompanySearchJsonResponse(
    companySearches: Array<CompanySearchPrimitive>,
  ): Array<Partial<CompanySearchPrimitive>> {
    return companySearches.map((companySearch) =>
      CompanySearch.toJsonResponse(companySearch),
    );
  }
}
