import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionService } from '@services/permision.service';
import { compare } from '@helpers/hash.helper';
import { FastifyReply } from 'fastify';
import { PasswordFindOneRepository } from '@modules/password/password-find-one.repository';
import { Roles } from '@shared/services/permission/types/roles.enum';
import { UserRolesFindOneRepository } from '@modules/user-roles/repositories/user-roles-find-one.repository';
import { ConfigService } from '@nestjs/config';
import { AppConfig, JwtConfig } from '@config/config.interface';
import { AuthTokens } from '../auth.interfaces';
import { UserFindOneInternalService } from '@modules/users/services/user-find-one-internal.service';
import { UserPrimitive } from '@shared/entities/user.entity';

@Injectable()
export class AuthJwtSingInRepostory {
  constructor(
    private userFindOneInternalService: UserFindOneInternalService,
    private userRolesFindOneRepository: UserRolesFindOneRepository,
    private passwordFindOneRepository: PasswordFindOneRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async validateAndGetUser(email: string, password: string) {
    const user = await this.userFindOneInternalService.execute({ email });

    const userPassword = user
      ? (
          await this.passwordFindOneRepository.execute(user.values.id)
        ).toPrimitive()
      : null;

    if (!user || !userPassword) {
      throw new UnauthorizedException();
    }

    const passwordCompare = await compare(password, userPassword.password);

    if (!passwordCompare) {
      throw new UnauthorizedException();
    }
    return user.toPrimitive();
  }

  private async _generateTokens(user: UserPrimitive): Promise<AuthTokens> {
    const jwtConfig = this.configService.get<JwtConfig>('jwt');

    const role = await this.userRolesFindOneRepository.execute(user.id);

    const payload = {
      sub: user.id,
      username: user.name,
      scopes: PermissionService.getModulesActionsByRoles([
        Roles[role.toPrimitive().name as keyof typeof Roles],
      ]),
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConfig.jwtSecret,
      expiresIn: jwtConfig.jwtExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConfig.jwtSecret,
      expiresIn: jwtConfig.jwtRefreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  async signIn(
    response: FastifyReply,
    email: string,
    password: string,
  ): Promise<{ user: UserPrimitive }> {
    const user = await this.validateAndGetUser(email, password);
    const { accessToken, refreshToken } = await this._generateTokens(user);
    const jwtConfig = this.configService.get<JwtConfig>('jwt');
    const config = this.configService.get<AppConfig>('app');

    response.setCookie('access_token', accessToken, {
      httpOnly: true,
      secure: config.isProduction,
      maxAge: jwtConfig.accessTtlSec,
      sameSite: 'strict',
      path: '/',
    });

    response.setCookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: config.isProduction,
      maxAge: jwtConfig.refreshTtlSec,
      sameSite: 'strict',
      path: '/',
    });

    return { user };
  }

  async signInMobile(
    email: string,
    password: string,
  ): Promise<AuthTokens & { user: UserPrimitive }> {
    const user = await this.validateAndGetUser(email, password);

    const tokens = await this._generateTokens(user);

    return {
      ...tokens,
      user,
    };
  }
}
