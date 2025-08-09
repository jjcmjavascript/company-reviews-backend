import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class CategoryFindAllRepository {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return this.prisma.category.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
