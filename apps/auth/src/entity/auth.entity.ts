import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index(['providerType', 'providerId'], { unique: true })
export class Auths {
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

  @Column()
  refreshToken: string;
}
