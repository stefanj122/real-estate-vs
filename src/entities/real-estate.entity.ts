import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from './images.entity';
import { User } from './user.entity';

@Entity({ name: 'real_estate' })
export class RealEstate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.realEstates)
  user: User;

  @OneToMany(() => Image, (image) => image.realEstate)
  images: Image[];

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  city: string;

  @Column({ type: 'varchar' })
  street: string;

  @Column()
  floor: number;

  @Column()
  type: string;

  @Column()
  square: number;

  @Column({ type: 'json' })
  options: object;

  @Column()
  numberOfBeds: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
