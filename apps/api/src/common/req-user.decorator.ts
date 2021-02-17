import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express-serve-static-core';

export interface KeycloakTokenParsed {
  exp?: number;
  iat?: number;
  nonce?: string;
  sub: string;
  session_state?: string;
  realm_access?: KeycloakRoles;
  resource_access?: KeycloakResourceAccess;
  email: string;
  groups: string[];
}

export interface KeycloakResourceAccess {
  [key: string]: KeycloakRoles;
}

export interface KeycloakRoles {
  roles: string[];
}

export type AuthenticatedRequest = Request & { user: KeycloakTokenParsed };

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
  return request.user;
});
