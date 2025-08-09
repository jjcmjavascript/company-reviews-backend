import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { User, UserPrimitive } from '@shared/entities/user.entity';

@Injectable()
export class UserFindOneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    where: Partial<UserPrimitive>,
    throwError: boolean = true,
  ): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where,
    });

    if (!user && throwError) {
      throw new NotFoundException('User not found');
    }

    return user ? User.create(user) : null;
  }
}
