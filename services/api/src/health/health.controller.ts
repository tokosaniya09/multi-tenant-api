import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { DatabaseService } from "../infra/postgres.service";
import { RedisService } from "../infra/redis.service";

@Controller('health')
export class HealthController {
    constructor(
        private readonly db: DatabaseService,
        private readonly redis: RedisService,
    ) { }
    
    @Get()
    async check() {
        const dbOk = await this.db.isHealthy();
        const redisOk = await this.redis.isHealthy();

        if (!dbOk || !redisOk) {
            throw new ServiceUnavailableException({
                status: 'unhealthy',
                postgres: dbOk,
                redis: redisOk,
            });
        }

        return {
            status: 'ok',
            postgres: true, 
            redis: true,
        }
    }
}