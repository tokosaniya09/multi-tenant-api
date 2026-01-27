import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RateLimitService } from "./rate-limit.service";
import { Request } from 'express';
import { TenantContextService } from "../tenant/tenant-context.service";

@Injectable()
export class RateLimitGuard implements CanActivate {
    constructor(
        private readonly limiter: RateLimitService,
        private readonly tenantContext: TenantContextService,
    ) { }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const tenant = this.tenantContext.getTenant();
        await this.limiter.checkLimit(tenant.id, 10);
        return true;
    }
}