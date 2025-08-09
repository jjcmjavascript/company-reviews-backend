export interface CategoryPrimitive {
  id: number;
  name: string;
  description?: string;
  deletedAt?: Date;
}

export class Category {
  private attributes: CategoryPrimitive;

  constructor(readonly category: CategoryPrimitive) {
    this.attributes = category;
  }

  static create(category: Partial<CategoryPrimitive>): Category {
    return new Category({
      id: category.id!,
      name: category.name!,
      description: category.description,
      deletedAt: category.deletedAt,
    });
  }

  toPrimitive(): CategoryPrimitive {
    return this.attributes;
  }

  static fromArray(categories: Array<CategoryPrimitive>): Array<Category> {
    return categories.map((category) => new Category(category));
  }

  static fromArrayToJsonResponse(
    categories: Array<CategoryPrimitive>,
  ): Array<{ id: number; name: string; description?: string }> {
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
    }));
  }

  get values() {
    return this.attributes;
  }
}
