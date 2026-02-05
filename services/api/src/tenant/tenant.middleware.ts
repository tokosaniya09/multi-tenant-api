import { Injectable, NestMiddleware } from "@nestjs/common";
import { TenantContextService } from "./tenant-context.service";
import { ApiKeyRepository } from "../auth/api-key.repository";
import { NextFunction, raw, Request, Response } from "express";
import { hashApiKey } from "../auth/api-key.util";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(
        private readonly tenantContext: TenantContextService,
        private readonly apiKeyRepo: ApiKeyRepository,
    ) { }
    
    async use(req: Request, res: Response, next: NextFunction) {
        (this.tenantContext as any).als?.enterWith?.({} as any);

        const rawKey = req.header('x-api-key');
        if(!rawKey) {
            return next();
        }

        try {
            const keyHash = hashApiKey(rawKey);
            const tenant = await this.apiKeyRepo.findTenantByKeyHash(keyHash);
            if (tenant) {
                this.tenantContext.setTenant({ id: tenant.tenantId });
            }
        } catch (err) {
            console.error('TenantMiddleware error while resolving API key:', err);
        }

        return next();
    }
}