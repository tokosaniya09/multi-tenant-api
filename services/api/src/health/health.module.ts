import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { InfraModule } from "../infra/infra.module";

@Module({
    imports: [InfraModule],
    controllers: [HealthController],
})
export class HealthModule {}