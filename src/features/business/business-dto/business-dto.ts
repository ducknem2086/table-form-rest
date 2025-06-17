export class BusinessDto {}
import { IsString } from 'class-validator';

export class BusinessDTO {
  @IsString()
  name: string;
}
