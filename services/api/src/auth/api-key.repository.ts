import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../infra/postgres.service";

@Injectable()
export class ApiKeyRepository {
    constructor(private readonly db: DatabaseService) { }
    
    async findTenantByKeyHash(keyHash: string): Promise<{ tenantId: string } | null> {
        const result = await this.db.getPool().query(
            `
            SELECT tenant_id
            FROM api_key
            WHERE key_hash = $1
                AND revoked_at IS NULL
            `,
            [keyHash]
        );  
        
        if (result.rowCount === 0) {
            return null;
        }

        return { tenantId: result.rows[0].tenant_id };
    }
}