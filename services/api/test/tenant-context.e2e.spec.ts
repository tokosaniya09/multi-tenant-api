import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { createTestApp } from './test-utils';


dotenv.config({ path: join(__dirname, '../../../.env') });

describe('Multi-tenant API (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    }, 30000);

    afterAll(async () => {
        await app.close();
    }, 30000);

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