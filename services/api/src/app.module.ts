import { Module } from "@nestjs/common";
import { InfraModule } from "./infra/infra.module";
import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { RateLimitModule } from "./rate-limit/rate-limit.module";
import { RateLimitGuard } from "./rate-limit/rate-limit.guard";
import { APP_GUARD } from "@nestjs/core/constants";
import { ApiKeyGuard } from "./auth/api-key.guard";
import { TenantModule } from "./tenant/tenant.module";

@Module({
    imports: [
        InfraModule,
        HealthModule,
        AuthModule,
        RateLimitModule,
        TenantModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ApiKeyGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RateLimitGuard,
        },
    ],
})

export class AppModule {}