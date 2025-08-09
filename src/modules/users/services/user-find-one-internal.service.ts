import { Injectable } from '@nestjs/common';
import { User } from '@shared/entities/user.entity';
import { UserFindOneRepository } from '../repositories/user-find-one.repository';

@Injectable()
export class UserFindOneInternalService {
  constructor(private readonly respository: UserFindOneRepository) {}

  async execute(params: { email?: string; id?: number }): Promise<User | null> {
    const user = await this.respository.execute(params);

    return user ? User.create(user) : null;
  }
}
