import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { encrypt } from '@helpers/hash.helper';
import { User, UserPrimitive } from '@entities/user.entity';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { PasswordCreateRepository } from '@modules/password/password-create.repository';
import { PasswordPrimitive } from '@shared/entities/password.entity';
import { UserRolesCreateRepository } from '@modules/user-roles/repositories/user-roles-create.repository';

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
    await this.checkDuplicateEmail(userDto.email);

    await this.checkDuplicateTax(userDto.tax);

    try {
      const user = { ...userDto };

      const hashedPassword = await encrypt(userDto.password);

      const newUser = await this.prismaService.$transaction(async (ctx) => {
        const tempUser = await ctx.user.create({
          data: {
            name: user.name,
            email: user.email,
            tax: user.tax,
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
    } catch (e) {
      throw new InternalServerErrorException(
        'An unexpected error occurred during user creation',
      );
    }
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
