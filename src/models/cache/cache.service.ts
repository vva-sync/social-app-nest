import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class CacheService implements OnModuleInit {
  private static instance: CacheService;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  onModuleInit() {
    CacheService.instance = this;
  }

  static getInstance(): CacheService {
    return CacheService.instance;
  }

  async get<T>(key: string): Promise<T> {
    return await this.cacheManager.get(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<T> {
    return await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string) {
    return await this.cacheManager.del(key);
  }

  async clear() {
    return await this.cacheManager.clear();
  }
}
