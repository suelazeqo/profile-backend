import { IsArray, IsString } from 'class-validator';

export class CreateProjectsDto {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];
}
