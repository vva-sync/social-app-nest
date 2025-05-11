import { PutObjectTaggingCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as AWS from 'aws-sdk';
import { uuid } from 'uuidv4';

@Injectable()
export class AwsService {
  private s3: AWS.S3;
  private s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = this.initS3();
    this.s3Client = this.initS3Client();
  }

  private initS3() {
    return new AWS.S3({
      accessKeyId: this.configService.get<string>('s3.accessKeyId'),
      secretAccessKey: this.configService.get<string>('s3.secretAccessKey'),
      region: this.configService.get<string>('s3.region'),
    });
  }

  private initS3Client() {
    return new S3Client({
      credentials: {
        accessKeyId: this.configService.get<string>('s3.accessKeyId'),
        secretAccessKey: this.configService.get<string>('s3.secretAccessKey'),
      },
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
      Key: `${uuid()}-${file.originalname}`,
      Body: file.buffer,
    }));

    return await Promise.all(
      params.map((param) => this.s3.upload(param).promise()),
    );
  }

  async tagDeletedImage(key: string) {
    const command = new PutObjectTaggingCommand({
      Bucket: this.configService.get<string>('s3.bucketName'),
      Key: key,
      Tagging: { TagSet: [{ Key: 'deleted', Value: 'yes' }] },
    });

    return await this.s3Client.send(command);
  }
}
