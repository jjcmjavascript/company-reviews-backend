import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { UserPrimitive } from '@shared/entities/user.entity';

@Injectable()
export class UserFindOneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where: Partial<UserPrimitive>): Promise<UserPrimitive | null> {
    return this.prismaService.user.findFirst({
      where,
    });
  }
}
