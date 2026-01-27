import { Module } from "@nestjs/common";
import { RateLimitGuard } from "./rate-limit.guard";
import { RateLimitService } from "./rate-limit.service";
import { InfraModule } from "../infra/infra.module";
import { TenantModule } from "../tenant/tenant.module";

@Module({
    imports: [InfraModule, TenantModule],
    providers: [RateLimitService, RateLimitGuard],
    exports: [RateLimitService, RateLimitGuard],
})
export class RateLimitModule {}