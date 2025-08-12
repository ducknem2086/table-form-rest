import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConfigType } from '../config-type/config-type';

@Entity({ name: 'Config', schema: 'public' })
export class Config {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  desc: string;

  @Column()
  dateFrom: Date;
  @Column()
  dateTo: Date;
  @Column()
  status: string;

  @Column()
  configTypeId: string;

  @ManyToOne(() => ConfigType)
  @JoinColumn({ name: 'configTypeId' })
  configType: ConfigType;

}
