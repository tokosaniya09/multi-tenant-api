import { RateLimitService } from "../src/rate-limit/rate-limit.service";

describe('RateLimitService', () => {
    let service: RateLimitService;
    let redis: any;
    
    beforeEach(() => {
        redis = {
            getClient: () => ({
                incr: jest.fn(),
                expire: jest.fn(),
            }),
        };
        service = new RateLimitService(redis);
    });

    it("allows request under limit", async () => {
        redis.getClient().incr.mockResolvedValue(1);

        await expect(
        service.checkLimit("tenant-1", 10),
        ).resolves.not.toThrow();
    });

    it("throws 429 when limit exceeded", async () => {
        redis.getClient().incr.mockResolvedValue(11);

        await expect(
            service.checkLimit("tenant-1", 9),
        ).rejects.toThrow();
    });
});