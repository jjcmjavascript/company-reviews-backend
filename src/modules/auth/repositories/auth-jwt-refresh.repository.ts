import { Config } from '@config/config.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply } from 'fastify';

export interface Tokens {
  newAccessToken: string;
  newRefreshToken: string;
}

@Injectable()
export class AuthJwtRefreshRepository {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async refreshTokens(
    response: FastifyReply,
    refreshToken: string,
  ): Promise<Tokens> {
    try {
      const config = this.configService.get<Config>('config');
      const verifyResult = await this.jwtService.verifyAsync(refreshToken, {
        secret: config.jwt.jwtSecret,
      });

      const payload = {
        sub: verifyResult.sub,
        username: verifyResult.username,
        scopes: verifyResult.scopes,
      };

      const newAccessToken = await this.jwtService.signAsync(payload, {
        expiresIn: config.jwt.jwtExpiresIn,
      });

      const newRefreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: config.jwt.jwtRefreshExpiresIn,
      });

      response.setCookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: config.app.isProduction,
        maxAge: config.jwt.jwtExpiresIn,
        sameSite: 'lax',
      });

      response.setCookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: config.app.isProduction,
        maxAge: config.jwt.jwtRefreshExpiresIn,
        sameSite: 'lax',
      });

      return {
        newAccessToken,
        newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
