import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client!: RedisClientType;

    async onModuleInit() {
        this.client = createClient({
            socket: {
                host: process.env.REDIS_HOST || 'localhost',
                port: Number(process.env.REDIS_PORT),
            },
        });

        this.client.on('error', (err) => {
            console.error('Redis Client Error', err);
        });

        await this.client.connect();
        await this.client.ping();
    }

    async onModuleDestroy() {
        await this.client.quit();
    }

    async isHealthy(): Promise<boolean> {
        try {
            await this.client.ping();
            return true;
        } catch {
            return false;
        }
    }

    getClient(): RedisClientType {
        return this.client;
    }
}