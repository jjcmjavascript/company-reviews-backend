import { Permission } from './interface/permission.interface';
import { Modules } from './types/modules.enum';
import { PermissionActions } from './types/permission-actions.enum';
import { Roles } from './types/roles.enum';

export const permissionList: Array<Permission> = [
  {
    role: Roles.Admin,
    modules: [
      {
        name: Modules.User,
        permissions: [
          PermissionActions.Read,
          PermissionActions.Write,
          PermissionActions.Delete,
          PermissionActions.Disabled,
          PermissionActions.CreateUserAdmin,
        ],
      },
    ],
  },
];
