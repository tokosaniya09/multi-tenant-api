import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../../.env') });

// Force tests to use localhost instead of Docker service names
process.env.DB_HOST = 'localhost';
process.env.REDIS_HOST = 'localhost';