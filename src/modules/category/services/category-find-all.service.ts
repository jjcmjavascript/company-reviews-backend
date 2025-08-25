import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryFindAllRepository } from '../repositories/category-find-all.repository';
import { Category } from '@shared/entities/category.entity';
import { DefaultLogger } from '@shared/services/logger.service';

@Injectable()
export class CategoryFindAllService {
  private readonly logger = new DefaultLogger(CategoryFindAllService.name);

  constructor(private readonly categoryRepository: CategoryFindAllRepository) {}

  async execute() {
    try {
      const result = await this.categoryRepository.execute();

      return Category.fromArrayToJsonResponse(result);
    } catch (error) {
      this.logger.error({
        message: `Error fetching categories: ${error.message}`,
        stack: error.stack,
      });
      throw new InternalServerErrorException(`Error fetching categories`);
    }
  }
}
