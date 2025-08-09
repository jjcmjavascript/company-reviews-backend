import { Controller, Get } from '@nestjs/common';
import { CategoryFindAllService } from './services/category-find-all.service';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryFindAllService: CategoryFindAllService,
  ) {}

  @Get()
  async findAll() {
    return this.categoryFindAllService.execute();
  }
}
