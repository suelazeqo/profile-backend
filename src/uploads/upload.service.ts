import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('File is required');
    }

    return `http://localhost:3000/uploads/${file.filename}`;
  }
}
