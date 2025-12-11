import { ClassConstructor } from 'class-transformer';
import { CacheService } from '../cache.service';

export function Cached<T extends object>(
  classType: ClassConstructor<T>,
  key: string | ((...args: unknown[]) => string),
  ttl?: number,
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: unknown[]) => Promise<T>>,
  ) {
    const originalMethod = descriptor.value;

    if (!originalMethod) {
      throw new Error('Decorator @Cached can only be applied to methods.');
    }

    descriptor.value = async function (...args: unknown[]): Promise<T> {
      const cacheManager = CacheService.getInstance();

      let cacheKey: string = '';

      if (typeof key === 'function') {
        cacheKey = key(...args);
      } else if (typeof key === 'string') {
        cacheKey = key;
      } else {
        cacheKey = JSON.stringify(key);
      }

      const cachedValue = await cacheManager.get<T>(cacheKey);

      if (cachedValue) {
        return cachedValue;
      }

      const result = (await originalMethod.apply(this, args)) as T;

      await cacheManager.set<T>(cacheKey, result, ttl * 1000);

      return result;
    };

    return descriptor;
  };
}
