export interface ReviewerTypeCategoryPrimitive {
  id: number;
  reviewerTypeId: number;
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
      reviewerTypeId: reviewerTypeCategory.reviewerTypeId,
      categoryId: reviewerTypeCategory.categoryId,
    };
  }

  static toJsonResponseFromArray(
    reviewerTypeCategories: Partial<ReviewerTypeCategoryPrimitive>[],
  ): Partial<ReviewerTypeCategoryPrimitive>[] {
    return reviewerTypeCategories.map((category) =>
      ReviewerTypeCategory.toJsonResponse(category),
    );
  }
}
