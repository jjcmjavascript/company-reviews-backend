// current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface JwtUser {
  userId: number;
  username: string;
  scopes: Record<string, Array<string>>;
  iat: number;
  exp: number;
}

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): JwtUser => {
    const request: Request = ctx.switchToHttp().getRequest();

    const user = request['user'] as
      | (Omit<JwtUser, 'userId'> & { sub: number })
      | null;

    if (!user) {
      throw new Error('User not found');
    }

    return {
      userId: Number(user.sub),
      username: user.username,
      scopes: user.scopes,
      iat: user.iat,
      exp: user.exp,
    };
  },
);
