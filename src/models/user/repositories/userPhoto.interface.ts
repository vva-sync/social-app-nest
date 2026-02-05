import { IBaseRepository } from '../../shared/base-repository.interface';

export interface IUserPhoto {
  url: string;
  isMain: boolean;
  user_id: number;
}

export interface IUserPhotoRepository extends IBaseRepository<IUserPhoto> {
  findByUserId(user_id: number): Promise<IUserPhoto[]>;
  findUserPhotoByName(name: string): Promise<IUserPhoto | null>;
}
