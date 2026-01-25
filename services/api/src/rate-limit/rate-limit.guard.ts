import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RateLimitService } from "./rate-limit.service";
import { Request } from 'express';

@Injectable()
export class RateLimitGuard implements CanActivate {
    constructor(private readonly limiter: RateLimitService) { }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        
        const tenant = (req as any).tenantId;
        console.log('Tenant on request:', tenant);

        // Defensive: auth must run first
        if (!tenant) {
            return true;
        }

        //hardcoded for now
        const limitPerMinute = 10;

        await this.limiter.checkLimit(tenant.id, limitPerMinute);
        console.log('RateLimitGuard hit', tenant?.id);
        return true;
    }
}