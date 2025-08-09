import { Injectable } from '@nestjs/common';
import { User } from '@shared/entities/user.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class UserFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<Array<User>> {
    const users = await this.prismaService.user.findMany();

    return User.fromArray(users);
  }
}
