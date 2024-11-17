import { CustomConfigService } from '../config/config.service';
import { Logger } from '@nestjs/common';

export function generateMongooseUri(configService: CustomConfigService): string {
    const user = encodeURIComponent(configService.dbUser || '');
    const password = encodeURIComponent(configService.dbPassword || '');
    const host = configService.dbHost;
    const port = configService.dbPort;
    const dbName = configService.dbName;

    let uri: string;
    if (user && password) {
        uri = `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`;
    } else {
        uri = `mongodb://${host}:${port}/${dbName}`;
    }

    Logger.log(`Generated MongoDB URI: ${uri}`);
    return uri;
}