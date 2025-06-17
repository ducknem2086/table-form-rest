import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Business', schema: 'public' }) // match Prisma table
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
