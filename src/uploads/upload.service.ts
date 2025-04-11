import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('File is required');
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    return `${baseUrl}/uploads/${file.filename}`;
  }
}
