import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RealEstate } from './real-estate.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => RealEstate, (realEstate) => realEstate.user)
  realEstates: RealEstate[];

  @Column({ type: 'varchar', unique: true, length: 50 })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', unique: true, length: 50 })
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ default: false })
  isAgency: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', default: 'user' })
  role: string;

  @Column({ default: null })
  emailVerifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
