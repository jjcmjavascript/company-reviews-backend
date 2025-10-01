import { UserCreateRepository } from '@modules/users/repositories/user-create.repository';
import { Injectable } from '@nestjs/common';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { AuthJwtSingInRepostory } from './auth-jwt-sigin.repository';

@Injectable()
export class AuthJwtRegisterMobileRepository {
  constructor(
    private userCreateRepository: UserCreateRepository,
    private jwtSingInRepostory: AuthJwtSingInRepostory,
  ) {}

  async execute(name: string, email: string, password: string) {
    const user = {
      name: name.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    await this.userCreateRepository.executeTransaction(
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      Roles.User,
    );

    return this.jwtSingInRepostory.signInMobile(user.email, user.password);
  }
}
