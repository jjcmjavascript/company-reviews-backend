import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthJwtRefreshRepository } from './repositories/auth-jwt-refresh.repository';
import { IS_LOGED_KEY } from '@shared/decorators/loged.decorator';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '@config/config.interface';
import { FastifyReply, FastifyRequest } from 'fastify';
import { extractTokenFromHeader } from '@shared/helpers/extract-token.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: AuthJwtRefreshRepository,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const config = this.configService.get<JwtConfig>('jwt');
    const hasTobeLoged = this.reflector.get<boolean>(
      IS_LOGED_KEY,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const response = context.switchToHttp().getResponse<FastifyReply>();
    const token = extractTokenFromHeader(request, 'access_token');

    try {
      if (!token && hasTobeLoged) {
        throw new UnauthorizedException('Invalid session');
      } else if (!token && !hasTobeLoged) {
        return true;
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwtSecret,
      });

      request['user'] = payload;
    } catch {
      const result = await this.tryRefreshToken(request, response);

      if (result) {
        return true;
      }

      throw new UnauthorizedException('Invalid session');
    }

    return true;
  }

  private async tryRefreshToken(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<boolean> {
    try {
      const config = this.configService.get<JwtConfig>('jwt');
      const refreshToken = extractTokenFromHeader(request, 'refresh_token');

      if (refreshToken) {
        const payload = await this.refreshTokenRepository.refreshTokens(
          response,
          refreshToken,
        );

        request['user'] = await this.jwtService.verifyAsync(
          payload.newAccessToken,
          {
            secret: config.jwtSecret,
          },
        );

        return true;
      }
    } catch {
      return false;
    }
  }
}
