import { Injectable, Scope } from "@nestjs/common";

export interface TenantContext {
    id: string;
}

@Injectable() 
export class TenantContextService {
    private tenant: TenantContext | null = null;

    setTenant(tenant: TenantContext) {
        this.tenant = tenant;
    }

    getTenant(): TenantContext {
        if (!this.tenant) {
            throw new Error('TenantContext not initialized');
        } 
        return this.tenant;
    }

    clear() {
        this.tenant = null;
    }
}