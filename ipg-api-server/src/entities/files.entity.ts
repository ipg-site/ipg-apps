import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  abstractPath: string;

  @Column({ type: 'text', nullable: true })
  moviePath: string;

  @Column({ type: 'text', nullable: true })
  presentationPath: string;

  @Column({ type: 'text', nullable: true })
  consentPath: string;
}
