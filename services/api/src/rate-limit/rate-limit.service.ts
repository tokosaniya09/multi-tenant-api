import { HttpException, HttpStatus, Injectable, ServiceUnavailableException } from "@nestjs/common";
import { RedisService } from "../infra/redis.service";

@Injectable() 
export class RateLimitService {
    constructor(private readonly redis: RedisService) { }
    
    async checkLimit(tenantId: string, limit: number): Promise<void> {
        const window = Math.floor(Date.now() / 60000);
        const key = `ratelimit:${tenantId}:${window}`;
        console.log('RateLimit key:', key);


        try {
            const count = await this.redis.getClient().incr(key);

            if (count === 1) {
                await this.redis.getClient().expire(key, 60);
            }

            if (count > limit) {
                throw new HttpException(
                    'Rate limit exceeded',
                    HttpStatus.TOO_MANY_REQUESTS,
                );
            }
        } catch (error) {
            // ✅ IMPORTANT: let 429 pass through
            if (error instanceof HttpException) {
                throw error;
            }

            // ❗ Only Redis / infra failures become 503
            throw new ServiceUnavailableException('Rate limit service is unavailable');
        }
    }

}