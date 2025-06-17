import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ConfigType', schema: 'public' })
export class ConfigType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
