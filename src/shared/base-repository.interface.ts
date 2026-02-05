export interface IDeleteResult {
  affected: number;
}

export interface IBaseRepository<T, TBase = T> {
  create(data: Partial<T>): Promise<TBase>;
  update(id: number, data: Partial<T>): Promise<TBase>;
  findById(id: number): Promise<TBase | null>;
  findAll(offset?: number, limit?: number): Promise<TBase[]>;
  delete(id: number): Promise<TBase>;
}
