import { ArrayNotEmpty, ArrayUnique, IsArray, IsUUID } from 'class-validator';

export interface IConfigTypeDTO {
  name: string;
  id: string;
}


export class DeleteConfigTypesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  ids!: string[];
}
