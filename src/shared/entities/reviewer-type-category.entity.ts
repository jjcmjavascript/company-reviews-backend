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

  static create(
    reviewerTypeCategory: ReviewerTypeCategoryPrimitive,
  ): ReviewerTypeCategory {
    return new ReviewerTypeCategory({
      id: reviewerTypeCategory.id!,
      typeId: reviewerTypeCategory.typeId!,
      categoryId: reviewerTypeCategory.categoryId!,
    });
  }

  toPrimitive(): ReviewerTypeCategoryPrimitive {
    return this.attributes;
  }

  static fromArray(
    reviewerTypeCategories: Array<ReviewerTypeCategoryPrimitive>,
  ): Array<ReviewerTypeCategory> {
    return reviewerTypeCategories.map(
      (reviewerTypeCategory) => new ReviewerTypeCategory(reviewerTypeCategory),
    );
  }

  get values() {
    return this.attributes;
  }
}
