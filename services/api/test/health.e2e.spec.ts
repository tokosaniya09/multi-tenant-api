import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { createTestApp } from "./test-utils";

describe("Health (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    }, 30000);

    it("returns ok when services are healthy", async () => {
        await request(app.getHttpServer())
        .get("/health")
        .set("x-api-key", "test-key")
        .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
