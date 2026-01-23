import { Module } from "@nestjs/common";
import { DatabaseService } from "./postgres.service";
import { RedisService } from "./redis.service";

@Module({
    providers: [DatabaseService, RedisService],
    exports: [DatabaseService, RedisService],
})

export class InfraModule {}