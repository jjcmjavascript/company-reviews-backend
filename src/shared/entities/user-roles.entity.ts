import { Roles } from '@shared/services/permission/types/roles.enum';

export interface UserRolesPrimitive {
  id: number;
  userId: number;
  name: string;
}

export class UserRoles {
  private attributes: UserRolesPrimitive;

  constructor(readonly userRoles: UserRolesPrimitive) {
    this.attributes = userRoles;
  }

  static create(role: Partial<UserRolesPrimitive>): UserRoles {
    return new UserRoles({
      id: role.id,
      userId: role.userId,
      name: role.name,
    });
  }

  toPrimitive(): Omit<UserRolesPrimitive, 'name'> & { name: Roles } {
    return {
      id: this.attributes.id,
      userId: this.attributes.userId,
      name: this.attributes.name as Roles,
    };
  }
  get values(): Omit<UserRolesPrimitive, 'name'> & { name: Roles } {
    return {
      id: this.attributes.id,
      userId: this.attributes.userId,
      name: this.attributes.name as Roles,
    };
  }
}
