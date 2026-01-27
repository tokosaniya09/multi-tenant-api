import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ApiKeyRepository } from "./api-key.repository";
import { hashApiKey } from "./api-key.util";
import { Request } from 'express';
import { TenantContextService } from "../tenant/tenant-context.service";

@Injectable() 
export class ApiKeyGuard implements CanActivate {
    constructor(
        private readonly repo: ApiKeyRepository,
        private readonly tenantContext: TenantContextService,
    ) {}

    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const rawKey = request.header('x-api-key');
        if (!rawKey) {
            throw new UnauthorizedException('API key is missing');
        }

        const keyHash = hashApiKey(rawKey);
        const tenant = await this.repo.findTenantByKeyHash(keyHash);

        if (!tenant) {
            throw new UnauthorizedException('Invalid API key');
        }

        this.tenantContext.setTenant({
            id: tenant.tenantId,
        });

        return true;    
    }
}