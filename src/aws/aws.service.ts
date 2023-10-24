import { Injectable, Logger, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

let bucketName: string;
let accessKeyId: string;
let secretAccessKey: string;
let s3: S3;

@Injectable()
export class AwsService {
  private readonly logger = new Logger(AwsService.name);
  constructor(private configService: ConfigService) {
    bucketName = this.configService.get('AWS_S3_BUCKET');
    accessKeyId = this.configService.get('AWS_S3_ACCESS_KEY');
    secretAccessKey = this.configService.get('AWS_S3_KEY_SECRET');
    s3 = new S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    })
  }

  async uploadFile(file) {
    const { originalname } = file;
    return await this.s3Upload(
      file.buffer,
      bucketName,
      originalname,
      file.mimetype,
    );
  }

  async s3Upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
      LocationConstraint: 'ap-southeast-1',
      },
    };
    try {
      let s3Response = await s3.upload(params).promise();
      return [s3Response.Location, s3Response.Key];
    } catch (error) {
      this.logger.error(error);
      throw new Error('File Upload Failed');
    }
  }

  async deleteFile(key: string) {
    try {
      const deleteFile = await s3.deleteObject({
        Bucket: bucketName,
        Key: key
      }).promise()
      return `${key} deleted from bucket`;
    } catch (error) {
      this.logger.error(error);
      throw new Error('File Delete Failed');
    }
  }

}
