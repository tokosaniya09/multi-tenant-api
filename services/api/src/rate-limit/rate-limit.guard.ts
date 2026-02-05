import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RateLimitService } from "./rate-limit.service";
import { TenantContextService } from "../tenant/tenant-context.service";

@Injectable()
export class RateLimitGuard implements CanActivate {
    constructor(
        private readonly limiter: RateLimitService,
        private readonly tenantContext: TenantContextService,
    ) { }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const tenant = this.tenantContext.getTenant();
            if (!tenant?.id) {
                return true;
            }

            const limitPerMinute = 10;
            await this.limiter.checkLimit(tenant.id, limitPerMinute);
        } catch (err) {
            if ((err as Error).message === 'TenantContext not initialized') {
                return true;
            }
            throw err;
        }

        return true;
    }
}