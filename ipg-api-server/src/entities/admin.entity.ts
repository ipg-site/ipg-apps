import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  abstractUpload: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  movieUpload: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  presentationUpload: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  redirect: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  programPage: boolean;
}
