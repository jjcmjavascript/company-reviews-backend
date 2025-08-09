import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRoles } from '@shared/entities/user-roles.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class UserRolesFindOneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    userId: number,
    throwError: boolean = true,
  ): Promise<UserRoles | null> {
    const result = await this.prismaService.userRole.findFirst({
      where: {
        userId,
      },
    });

    if (!result && throwError) {
      throw new NotFoundException('User role not found');
    }

    return UserRoles.create(result);
  }
}
