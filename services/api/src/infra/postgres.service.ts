import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool = new Pool;

    async onModuleInit() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log('Connecting to Postgres...');

        await this.pool.query(`SELECT 1`);
    }

    async onModuleDestroy() {
        await this.pool.end();
    }

    async isHealthy(): Promise<boolean> {
        try {
            await this.pool.query(`SELECT 1`);
            return true;
        } catch {
            console.error('Postgres health check failed');
            return false;
        }
    }

    getPool(): Pool {
        return this.pool;
    }
}