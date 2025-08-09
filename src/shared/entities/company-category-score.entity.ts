export interface CompanyCategoryScorePrimitive {
  id: number;
  reportedCompanyId: number;
  categoryId: number;
  verifiedScore: number;
  unverifiedScore: number;
  createdAt: Date;
  deletedAt?: Date | null;
}

export class CompanyCategoryScoreEntity {
  constructor(private readonly attributes: CompanyCategoryScorePrimitive) {}

  get values(): CompanyCategoryScorePrimitive {
    return this.attributes;
  }
}
