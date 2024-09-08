import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
@Index(['providerType', 'providerId'], { unique: true })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  role: string;

  @Column()
  providerType: string;

  @Column()
  providerId: string;

  // TODO: 추후에 non null로 변경 필요 (지금도 DDL 건드린건 없어서 nullable로 되어있어요.)
  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
