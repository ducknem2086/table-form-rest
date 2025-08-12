import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export interface IConfigDto {
  desc: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  configTypeId: string;
}


export class ListConfigQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100) // why: protect DB
  limit?: number;
}

