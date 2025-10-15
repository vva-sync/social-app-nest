import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private envConfig: { [key: string]: string };

  constructor(
    @Inject('CONFIG_OPTIONS') private options: { folderPath: string },
  ) {
    try {
      const filePath = `${process.env.NODE_ENV || 'development'}.env`;
      const envFile = path.resolve(
        __dirname,
        '../../',
        options.folderPath,
        filePath,
      );
      this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    } catch (error) {
      console.error(`Failed to load config: ${error.message}`);
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
