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

    if (!hasTobeLoged) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const response = context.switchToHttp().getResponse<FastifyReply>();
    const token = this.extractTokenFromHeader(request, 'access_token');

    try {
      if (!token) {
        throw new UnauthorizedException('Invalid token');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwtSecret,
      });

      response['user'] = payload;
    } catch {
      const result = await this.tryRefreshToken(request, response);

      if (result) {
        return true;
      }

      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private async tryRefreshToken(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<boolean> {
    try {
      const config = this.configService.get<JwtConfig>('jwt');
      const refreshToken = this.extractTokenFromHeader(
        request,
        'refresh_token',
      );

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

  private extractTokenFromHeader(
    request: FastifyRequest,
    tokenName: string,
  ): string | null {
    const authHeader = request.headers.authorization;
    if (
      authHeader &&
      authHeader.startsWith('Bearer ') &&
      tokenName === 'access_token'
    ) {
      return authHeader.split(' ')[1];
    }

    // Si no está en el header, buscar en las cookies (para web)
    const { access_token, refresh_token } = request.cookies;

    if (tokenName === 'access_token') {
      return access_token || null;
    }

    if (tokenName === 'refresh_token') {
      return refresh_token || null;
    }

    return null;
  }
}
