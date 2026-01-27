import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { TenantContextService } from '../src/tenant/tenant-context.service';


dotenv.config({ path: join(__dirname, '../../../.env') });

describe('Multi-tenant API (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        process.env.DB_HOST = 'localhost';
        process.env.REDIS_HOST = 'localhost';

        console.log('--- Environment Check ---');
        console.log('Current Directory:', __dirname);
        console.log('REDIS_PORT:', process.env.REDIS_PORT); // Check your actual .env key name
        console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? 'Exists' : 'MISSING');
        console.log('-------------------------');

        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    }, 30000);

    afterAll(async () => {
        await app.close();
    }, 30000);

    // test/tenant-context.e2e.spec.ts
    afterEach(async () => {
        const tenantContext = app.get(TenantContextService);
        tenantContext.clear();
    });
        
    it('rejects requests without API key', async () => {
        await request(app.getHttpServer())
            .get('/health')
            .expect(401);
    });

    it('allows request with valid API key', async () => {
        await request(app.getHttpServer())
            .get('/health')
            .set('x-api-key', 'test-key')
            .expect(200);
    });

    it('applies rate limiting per tenant', async () => {
        for (let i = 0; i < 11; i++) {
            const res = await request(app.getHttpServer())
                .get('/health')
                .set('x-api-key', 'test-key');
        
            if (i < 9) {
                expect(res.status).toBe(200);
            } else {
                expect(res.status).toBe(429);
            }
        }
    });
});