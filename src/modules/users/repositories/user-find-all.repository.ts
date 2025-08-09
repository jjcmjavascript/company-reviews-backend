import { Injectable } from '@nestjs/common';
import { User, UserPrimitive } from '@shared/entities/user.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class UserFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<Array<UserPrimitive>> {
    const users = await this.prismaService.user.findMany();

    return User.fromArrayToJsonResponse(users);
  }
}
