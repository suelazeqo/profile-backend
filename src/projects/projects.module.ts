import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UploadModule } from '../uploads/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UploadModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
