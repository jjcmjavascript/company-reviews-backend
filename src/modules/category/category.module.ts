import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryFindAllService } from './services/category-find-all.service';
import { CategoryFindAllRepository } from './repositories/category-find-all.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryFindAllService, CategoryFindAllRepository],
  exports: [CategoryFindAllService, CategoryFindAllRepository],
})
export class CategoryModule {}
