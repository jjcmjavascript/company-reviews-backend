export interface CompanyCategoryScorePrimitive {
  id: number;
  reportedCompanyId: number;
  categoryId: number;
  verifiedScore: number;
  unverifiedScore: number;
  verifiedSum: number;
  unverifiedSum: number;
  verifiedCount: number;
  unverifiedCount: number;
  createdAt: Date;
  deletedAt?: Date | null;
}

export class CompanyCategoryScoreEntity {
  constructor(private readonly attributes: CompanyCategoryScorePrimitive) {}

  get values(): CompanyCategoryScorePrimitive {
    return this.attributes;
  }

  static fromArrayToJsonResponse(
    data: Partial<CompanyCategoryScorePrimitive>[],
  ): Partial<CompanyCategoryScorePrimitive>[] {
    return data.map((item) => ({
      id: item.id,
      reportedCompanyId: item.reportedCompanyId,
      categoryId: item.categoryId,
      verifiedScore: item.verifiedScore,
      unverifiedScore: item.unverifiedScore,
      verifiedSum: item.verifiedSum,
      unverifiedSum: item.unverifiedSum,
      verifiedCount: item.verifiedCount,
      unverifiedCount: item.unverifiedCount,
      createdAt: item.createdAt,
      deletedAt: item.deletedAt,
    }));
  }

  static toJsonResponse(
    data: Partial<CompanyCategoryScorePrimitive>,
  ): Partial<CompanyCategoryScorePrimitive> {
    return {
      id: data.id,
      reportedCompanyId: data.reportedCompanyId,
      categoryId: data.categoryId,
      verifiedScore: data.verifiedScore,
      unverifiedScore: data.unverifiedScore,
      verifiedSum: data.verifiedSum,
      unverifiedSum: data.unverifiedSum,
      verifiedCount: data.verifiedCount,
      unverifiedCount: data.unverifiedCount,
      createdAt: data.createdAt,
      deletedAt: data.deletedAt,
    };
  }
}
