import { Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from 'async_hooks';

export interface TenantContext {
    id: string;
}

@Injectable()
export class TenantContextService {
    private readonly als = new AsyncLocalStorage<TenantContext>();

    setTenant(tenant: TenantContext) {
        this.als.enterWith(tenant);
    }

    getTenant(): TenantContext {
        const tenant = this.als.getStore();
        if (!tenant) {
            throw new Error('TenantContext not initialized');
        } 
        return tenant;
    }
}