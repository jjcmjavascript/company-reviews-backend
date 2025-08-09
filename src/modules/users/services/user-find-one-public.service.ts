import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserPrimitive } from '@shared/entities/user.entity';
import { UserFindOneRepository } from '../repositories/user-find-one.repository';
import { JwtUser } from '@shared/decorators/user.decorator';

@Injectable()
export class UserFindOneService {
  constructor(private readonly respository: UserFindOneRepository) {}

  async execute({
    id,
    currentUser,
  }: {
    id: number;
    currentUser: JwtUser;
  }): Promise<UserPrimitive> {
    if (currentUser && id && id === currentUser.userId) {
      const user = await this.respository.execute({
        id,
      });

      return user ? User.create(user).toPrimitive() : null;
    }

    throw new UnauthorizedException();
  }
}
