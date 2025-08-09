import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CategoryFindAllRepository } from '../repositories/category-find-all.repository';
import { Category } from '@shared/entities/category.entity';

@Injectable()
export class CategoryFindAllService {
  private readonly logger = new Logger(CategoryFindAllService.name);
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
