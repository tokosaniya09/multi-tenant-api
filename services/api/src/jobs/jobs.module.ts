import { Module } from "@nestjs/common";
import { InfraModule } from "../infra/infra.module";
import { JobsController } from "./jobs.controller";
import { JobsRepository } from "./jobs.repository";
import { TenantModule } from "../tenant/tenant.module";

@Module({
    imports: [InfraModule, TenantModule],
    controllers: [JobsController],
    providers: [JobsRepository]
})

export class JobsModule {}