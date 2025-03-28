import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = this.initS3();
  }

  private initS3() {
    return new AWS.S3({
      accessKeyId: this.configService.get<string>('s3.accessKeyId'),
      secretAccessKey: this.configService.get<string>('s3.secretAccessKey'),
      region: this.configService.get<string>('s3.region'),
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.configService.get<string>('s3.bucketName'),
      Key: file.originalname,
      Body: file.buffer,
    };
    return this.s3.upload(params).promise();
  }

  async uploadFiles(files: Express.Multer.File[]) {
    const params = files.map((file) => ({
      Bucket: this.configService.get<string>('s3.bucketName'),
      Key: `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
      Body: file.buffer,
    }));

    return await Promise.all(
      params.map((param) => this.s3.upload(param).promise()),
    );
  }
}
