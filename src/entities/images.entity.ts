import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RealEstate } from './real-estate.entity';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.images)
  realEstate: RealEstate;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
