import { FastifyRequest } from 'fastify';

export const extractTokenFromHeader = (
  request: FastifyRequest,
  tokenName: string,
): string | null => {
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
};
