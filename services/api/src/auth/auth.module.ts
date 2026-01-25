import { Module } from "@nestjs/common";
import { InfraModule } from "../infra/infra.module";
import { ApiKeyGuard } from "./api-key.guard";
import { ApiKeyRepository } from "./api-key.repository";

@Module({
    imports: [InfraModule],
    providers: [ApiKeyRepository, ApiKeyGuard],
    exports: [ApiKeyGuard, ApiKeyRepository],
})
export class AuthModule {}