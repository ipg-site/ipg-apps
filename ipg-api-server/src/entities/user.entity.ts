import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { File } from './files.entity';
import { History } from './history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 500,
    nullable: false,
    type: 'varchar',
    width: 255,
    unique: true,
  })
  email: string;

  @Column({ length: 500, nullable: false, type: 'varchar', width: 255 })
  password: string;

  @Column({
    length: 500,
    nullable: false,
    type: 'text',
    width: 255,
  })
  fullName: string;

  @Column({ length: 500, nullable: false, type: 'varchar', width: 255 })
  university: string;

  @Column({
    length: 500,
    nullable: false,
    type: 'varchar',
  })
  grade: string;

  @Column({
    length: 500,
    nullable: false,
    type: 'varchar',
  })
  presentationType: string;

  @Column({
    length: 500,
    nullable: false,
    type: 'varchar',
  })
  address: string;

  @Column({
    length: 500,
    nullable: false,
    type: 'text',
  })
  title: string;

  @Column({
    length: 40,
    nullable: true,
    type: 'varchar',
  })
  presentationId: string;

  @Column({
    nullable: true,
    type: 'datetime',
  })
  lastLoginAt: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(() => File, {
    cascade: ['insert', 'remove'],
  })
  @JoinColumn()
  file: File;

  @OneToMany(() => History, (history) => history.user)
  @JoinColumn()
  histories: History[];
}
