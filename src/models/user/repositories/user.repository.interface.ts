import { IBaseRepository } from '../../../shared/base-repository.interface';

export interface IUserRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  search(search: string, offset?: number, limit?: number): Promise<IUser[]>;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
}
