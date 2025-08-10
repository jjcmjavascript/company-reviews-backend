import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserCreateRepository } from './repositories/user-create.repository';
import { UserFindAllRepository } from './repositories/user-find-all.repository';
import { UserCreateDto } from './user.dto';
import { HasRoles } from '@shared/decorators/user-roles.decorator';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { Loged } from '@shared/decorators/loged.decorator';
import { CurrentUser, JwtUser } from '@shared/decorators/user.decorator';
import { UserFindOneService } from './services/user-find-one-public.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly findAllService: UserFindAllRepository,
    private readonly createService: UserCreateRepository,
    private readonly findOneService: UserFindOneService,
  ) {}

  @Get()
  @Loged()
  @HasRoles(Roles.Admin)
  async findAll() {
    const users = await this.findAllService.execute();

    return users;
  }

  @Post()
  async create(@Body() userDto: UserCreateDto) {
    const result = await this.createService.executeTransaction(
      userDto,
      Roles.User,
    );

    return result.toPrimitive();
  }

  @Get(':id')
  @Loged()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: JwtUser,
  ) {
    const user = await this.findOneService.execute({ id, currentUser });

    return user;
  }
}
