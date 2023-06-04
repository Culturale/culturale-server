import { promisify } from 'util';

import type { AWSError} from 'aws-sdk';
import { S3} from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();


export class S3Service {
  private bucketName: string;
  private region: string;
  private accessKeyId: string;
  private secretAccessKey: string;
  private s3Client: S3;

  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME;
    this.region = process.env.AWS_BUCKET_REGION;
    this.accessKeyId = process.env.AWS_ACCESS_KEY;
    this.secretAccessKey = process.env.AWS_SECRET;
    this.s3Client = new S3({
      accessKeyId: this.accessKeyId,
      region: this.region,
      secretAccessKey: this.secretAccessKey,
    });
  }

  public async uploadFile(buffer: Buffer, fileName: string): Promise<S3.ManagedUpload.SendData | AWSError> {
    const uploadParams: S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Body: buffer,
      Key: fileName,
    };

    const putObjectAsync = promisify(this.s3Client.putObject).bind(this.s3Client);
    const res = await putObjectAsync(uploadParams);

    return res as S3.ManagedUpload.SendData | AWSError;
  }
  
  
}