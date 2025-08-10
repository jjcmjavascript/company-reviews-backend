export interface ReviewerTypeCategoryPrimitive {
  id: number;
  typeId: number;
  categoryId: number;
}

export class ReviewerTypeCategory {
  private attributes: ReviewerTypeCategoryPrimitive;

  constructor(readonly reviewerTypeCategory: ReviewerTypeCategoryPrimitive) {
    this.attributes = reviewerTypeCategory;
  }

  get values() {
    return this.attributes;
  }

  static toJsonResponse(
    reviewerTypeCategory: Partial<ReviewerTypeCategoryPrimitive>,
  ): Partial<ReviewerTypeCategoryPrimitive> {
    return {
      id: reviewerTypeCategory.id,
      typeId: reviewerTypeCategory.typeId,
      categoryId: reviewerTypeCategory.categoryId,
    };
  }
}
