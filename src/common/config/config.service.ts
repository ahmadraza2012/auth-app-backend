import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Default Application configurations
const DefaulConfigs = {
    DB: {
        host: 'localhost',
        port: 5432,
        name: 'mydatabase',
    },
    JWT: {
        secretKey: 'default_jwt_secret_key',
        expiryInMinutes: 60,
        defaultPort: 3000,
    }
}

@Injectable()
export class CustomConfigService {
    constructor(private configService: ConfigService) {}

    get DEFAUTL_PORT(): number {
        // Fetch the port from the environment or use the default
        return this.configService.get<number>('ENV_APPLICATION_PORT', DefaulConfigs.JWT.defaultPort );
    }

    get jwtSecretKey(): string {
        // Fetch the JWT secret key from the environment or use the default
        return this.configService.get<string>('ENV_JWT_SECRET_KEY', DefaulConfigs.JWT.secretKey);
    }

    get jwtExpiryInMinutes(): number {
        // Fetch the JWT expiry time in minutes from the environment or use the default
        return this.configService.get<number>('ENV_JWT_EXPIRY_IN_MINUTES', DefaulConfigs.JWT.expiryInMinutes);
    }

    get dbHost(): string {
        return this.configService.get<string>('ENV_DB_HOST', DefaulConfigs.DB.host);
    }

    get dbPort(): number {
        return this.configService.get<number>('ENV_DB_PORT', DefaulConfigs.DB.port);
    }

    get dbName(): string {
        return this.configService.get<string>('ENV_DB_NAME', DefaulConfigs.DB.name);
    }

    get dbUser(): string {
        return this.configService.get<string>('ENV_DB_USER', '');
    }

    get dbPassword(): string {
        return this.configService.get<string>('ENV_DB_PASSWORD', '');
    }

    get isCorsEnabled(): boolean {
        return this.configService.get<boolean>('ENV_CORS_ENABLED', false);
    }

    get allowedOrigins(): string[] {
        const origins = this.configService.get<string>('ENV_CORS_ALLOWED_ORIGINS', '');
        return origins ? origins.split(',') : [];
    }

    get throttleTTL(): number {
        return this.configService.get<number>('ENV_THROTTLE_TTL', 60 * 1000); // Default to 1 minute
    }

    get throttleLimit(): number {
        return this.configService.get<number>('ENV_THROTTLE_LIMIT', 10); // Default to 10 requests
    }
}