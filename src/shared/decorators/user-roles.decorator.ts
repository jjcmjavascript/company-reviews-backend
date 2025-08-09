import { SetMetadata } from '@nestjs/common';
import { Roles } from '@shared/services/permission/types/roles.enum';

export const HasRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
