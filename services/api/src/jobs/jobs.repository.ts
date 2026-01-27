import { randomUUID } from "crypto";
import { DatabaseService } from "../infra/postgres.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JobsRepository {
    constructor(private readonly db: DatabaseService) { }

    async createJob(tenantId: string, payload: any) { 
        const id = randomUUID();

        await this.db.getPool().query(
            `
            INSERT INTO jobs (id, tenant_id, status, payload)
            VALUES ($1, $2, $3, $4)
            `,
            [id, tenantId, 'pending', payload]
        );

        return { id };
    }

}