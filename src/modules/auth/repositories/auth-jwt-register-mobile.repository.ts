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

  async execute(name: string, email: string, password) {
    await this.userCreateRepository.executeTransaction(
      {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      },
      Roles.User,
    );

    return this.jwtSingInRepostory.signInMobile(email, password);
  }
}
