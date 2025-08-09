import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserCreateRepository } from './repositories/user-create.repository';
import { UserFindAllRepository } from './repositories/user-find-all.repository';
import { UserCreateDto } from './user.dto';
import { UserFindOneRepository } from './repositories/user-find-one.repository';
import { arrayEntityToHash } from '@shared/helpers/array-entity-to-hash.helper';
import { HasRoles } from '@shared/decorators/user-roles.decorator';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { Loged } from '@shared/decorators/loged.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly findAllService: UserFindAllRepository,
    private readonly createService: UserCreateRepository,
    private readonly findOneService: UserFindOneRepository,
  ) {}

  @Get()
  @Loged()
  @HasRoles(Roles.Admin)
  async findAll() {
    const users = await this.findAllService.execute();

    const normalizedUsers = arrayEntityToHash(users);

    return {
      users: normalizedUsers,
    };
  }

  @Post()
  @HasRoles(Roles.Admin)
  async create(@Body() userDto: UserCreateDto) {
    console.log('Creating user:', userDto);
    const result = await this.createService.executeTransaction(
      userDto,
      Roles.User,
    );

    return result.toPrimitive();
  }

  @Loged()
  @HasRoles(Roles.Admin)
  async createAdmin(@Body() userDto: UserCreateDto) {
    const result = await this.createService.executeTransaction(
      userDto,
      Roles.Admin,
    );

    return result;
  }

  @Get(':id')
  @Loged()
  async findOne(@Param('id') id: number) {
    const user = await this.findOneService.execute({ id });

    return user;
  }
}
