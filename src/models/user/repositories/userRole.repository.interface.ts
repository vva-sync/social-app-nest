export interface IUserRoleRepository {
  create(id: number, role: string): Promise<void>;
}
