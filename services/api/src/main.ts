import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './auth/api-key.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const apiKeyGuard = app.get(ApiKeyGuard);
    app.useGlobalGuards(apiKeyGuard);

    await app.listen(3000);
}

bootstrap();
