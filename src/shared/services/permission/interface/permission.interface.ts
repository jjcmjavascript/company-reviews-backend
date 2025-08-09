export interface ModulePermissions {
  name: string;
  permissions: string[];
}

export interface Permission {
  role: string;
  modules: ModulePermissions[];
}
