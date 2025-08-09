import { Roles } from './types/roles.enum';
import { Permission } from './interface/permission.interface';
import { permissionList } from './permision-list';

export class PermissionService {
  private static permissions: Permission[] = permissionList;

  public static getModulesActionsByRoles(
    roles: Roles[],
  ): Record<string, string[]> {
    const modulesActions = {};
    const permissions = PermissionService.permissions;

    roles.forEach((role) => {
      const currentRoleModules = permissions.find((p) => (p.role = role));

      currentRoleModules.modules.forEach((module) => {
        modulesActions[module.name] = module.permissions;
      });
    });

    return modulesActions;
  }
}
