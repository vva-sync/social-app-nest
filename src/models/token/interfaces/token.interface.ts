import { IUser } from '../../user/repositories/user.repository.interface';

export interface ITokenBase {
  id: number;
  token: string;
  created_at: Date;
  user_id: number;
}

export interface IToken extends ITokenBase {
  user: IUser;
}
