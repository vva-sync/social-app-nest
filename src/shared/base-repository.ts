import { Request } from 'express';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { TRANSACTION_KEY } from './transaction.interceptors';

export class BaseRepository {
  constructor(
    private dataSource: DataSource,
    private request: Request,
  ) {}

  protected getRepository<T>(entityCls: new () => T): Repository<T> {
    const entityManager: EntityManager =
      this.request[TRANSACTION_KEY] ?? this.dataSource.manager;
    return entityManager.getRepository(entityCls);
  }
}
