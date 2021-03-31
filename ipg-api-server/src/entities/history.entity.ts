import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.histories, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar', length: 500 })
  type: string;

  @Column({ type: 'text', nullable: true })
  value: string;

  @CreateDateColumn()
  createdAt: string;
}
