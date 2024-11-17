import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Connection, Mongoose } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class MongooseConnectionService implements OnApplicationBootstrap {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onApplicationBootstrap() {
    this.connection.on('connected', () => {
      console.log('[MongooseConnectionService] 🟢 Connected to MongoDB successfully.');
    });

    this.connection.on('error', (err) => {
      console.error('[MongooseConnectionService] 🔴 Error connecting to MongoDB:', err.message);
    });

    this.connection.on('disconnected', () => {
      console.warn('[MongooseConnectionService] 🟡 MongoDB connection lost.');
    });
  }
}