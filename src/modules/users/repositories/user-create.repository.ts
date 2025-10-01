import { Injectable, ConflictException } from '@nestjs/common';
import { encrypt } from '@helpers/hash.helper';
import { User, UserPrimitive } from '@entities/user.entity';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { PasswordCreateRepository } from '@modules/password/password-create.repository';
import { PasswordPrimitive } from '@shared/entities/password.entity';
import { UserRolesCreateRepository } from '@modules/user-roles/repositories/user-roles-create.repository';
import { faker } from '@faker-js/faker';

@Injectable()
class UserCreateRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordCreateRepository: PasswordCreateRepository,
    private readonly userRoleCreateRepository: UserRolesCreateRepository,
  ) {}

  async executeTransaction(
    userDto: Partial<UserPrimitive & PasswordPrimitive>,
    type: Roles,
  ): Promise<User> {
    const user = {
      ...userDto,
      name: userDto.name.trim()?.toLowerCase(),
      email: userDto.email.trim()?.toLowerCase(),
      tax: userDto.tax?.trim()?.toLowerCase(),
    };

    await this.checkDuplicateEmail(user.email);

    await this.checkDuplicateTax(user.tax);

    const hashedPassword = await encrypt(user.password);

    const newUser = await this.prismaService.$transaction(async (ctx) => {
      const tempUser = await ctx.user.create({
        data: {
          name: user.name,
          email: user.email,
          tax: user.tax ? user.tax.toString() : null,
          nickName: faker.internet.username(),
        },
      });

      await this.passwordCreateRepository.executeFromTransaction(
        ctx,
        tempUser.id,
        hashedPassword,
      );

      await this.userRoleCreateRepository.executeFromTransaction(
        ctx,
        tempUser.id,
        type,
      );

      return new User({
        id: tempUser.id,
        name: tempUser.name,
        email: tempUser.email,
        tax: tempUser.tax,
        deletedAt: tempUser.deletedAt,
      });
    });

    return newUser;
  }

  async checkDuplicateEmail(email: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new ConflictException('Email already exists');
    }
  }

  async checkDuplicateTax(tax?: string): Promise<void> {
    const user = tax
      ? await this.prismaService.user.findFirst({
          where: { tax },
        })
      : null;

    if (user) {
      throw new ConflictException('Tax already exists');
    }
  }
}

export { UserCreateRepository };
