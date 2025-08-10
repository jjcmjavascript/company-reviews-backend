import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { FindMany } from '@shared/interfaces/prisma-query.interfaces';

@Injectable()
export class ReviewerTypeFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: FindMany) {
    return this.prismaService.reviewerType.findMany(params);
  }
}
