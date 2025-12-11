import { Module } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import KeyvRedis from "@keyv/redis";


@Module({
    providers: [CacheService],
    exports: [CacheService],
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                stores: [
                    new KeyvRedis(`redis://${configService.get<string>('redis.host')}:${configService.get<string>('redis.port')}`),
                ]
            })
        })
    ]
})
export class Cache { }