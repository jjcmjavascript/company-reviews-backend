import { Injectable, NotFoundException } from '@nestjs/common';
import { Password } from '@shared/entities/password.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class PasswordFindOneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    userId: number,
    throwError: boolean = true,
  ): Promise<Password | null> {
    const result = await this.prismaService.password.findFirst({
      where: {
        userId,
      },
    });

    if (!result && throwError) {
      throw new NotFoundException('User role not found');
    }

    return Password.create(result);
  }
}
