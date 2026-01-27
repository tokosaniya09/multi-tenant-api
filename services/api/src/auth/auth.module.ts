import { Module } from "@nestjs/common";
import { InfraModule } from "../infra/infra.module";
import { ApiKeyGuard } from "./api-key.guard";
import { ApiKeyRepository } from "./api-key.repository";
import { TenantModule } from "../tenant/tenant.module";

@Module({
    imports: [InfraModule, TenantModule],
    providers: [ApiKeyRepository, ApiKeyGuard],
    exports: [ApiKeyRepository, ApiKeyGuard],
})
export class AuthModule {}