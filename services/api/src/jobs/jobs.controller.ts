import { Body, Controller, Post, Req } from "@nestjs/common";
import { JobsRepository } from "./jobs.repository";
import { CreateJobDto } from "./dto/create-job.dto";
import { TenantContextService } from "../tenant/tenant-context.service";

@Controller('jobs')
export class JobsController {
    constructor(
        private readonly repo: JobsRepository,
        private readonly tenantContext: TenantContextService,
    ) { }

    @Post()
    async createJob(@Body() dto: CreateJobDto) {
        const tenant = this.tenantContext.getTenant();
        const job = await this.repo.createJob(tenant.id, dto);

        return {
            jobId: job.id,
            status: 'queued',
        };
    }
}