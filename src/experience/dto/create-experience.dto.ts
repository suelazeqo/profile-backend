import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateExperienceDTO {
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  responsibilities: string[];

  @IsArray()
  @IsString({ each: true })
  skills: string[];
}
