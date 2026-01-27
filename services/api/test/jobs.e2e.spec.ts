import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { createTestApp } from "./test-utils";

describe("Jobs (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    }, 30000);
    
    afterAll(async () => {
        await app.close();
    });

    it("rejects invalid payload", async () => {
        await request(app.getHttpServer())
        .post("/jobs")
        .set("x-api-key", "test-key")
        .send({ task: 123 })
        .expect(400);
    });
});
