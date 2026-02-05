export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  findById(id: number): Promise<T | null>;
  findAll(offset?: number, limit?: number): Promise<T[]>;
  delete(id: number): Promise<void>;
}
