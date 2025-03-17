import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateSubcategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
