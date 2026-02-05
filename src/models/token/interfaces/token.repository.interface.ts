import {
  IBaseRepository,
  IDeleteResult,
} from '../../../shared/base-repository.interface';
import { IToken, ITokenBase } from './token.interface';

export interface ITokenRepository extends IBaseRepository<IToken, ITokenBase> {
  findByToken(token: string): Promise<ITokenBase | null>;
  findByUserId(userId: number): Promise<ITokenBase | null>;
  deleteByToken(token: string): Promise<IDeleteResult>;
}
