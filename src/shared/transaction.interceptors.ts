import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, concatMap, finalize } from 'rxjs';
import { DataSource } from 'typeorm';

export const TRANSACTION_KEY = 'TRANSACTION_KEY';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const req = context.switchToHttp().getRequest();

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    req[TRANSACTION_KEY] = queryRunner.manager;

    return next.handle().pipe(
      concatMap(async (data) => {
        await queryRunner.commitTransaction();
        return data;
      }),
      catchError(async (e) => {
        await queryRunner.rollbackTransaction();
        throw e;
      }),
      finalize(async () => {
        await queryRunner.release();
      }),
    );
  }
}
