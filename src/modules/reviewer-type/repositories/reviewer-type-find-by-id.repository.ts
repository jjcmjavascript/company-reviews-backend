import { Injectable } from '@nestjs/common';
import { ReviewerTypePrimitive } from '@shared/entities/reviewer-type.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewerTypeFindByIdRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: number): Promise<ReviewerTypePrimitive | null> {
    return this.prismaService.reviewerType.findUnique({
      where: { id },
    });
  }
}
