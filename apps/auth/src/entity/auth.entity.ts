import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Auths {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  providerType: string;

  @Column()
  providerId: string;

  @Column()
  refreshToken: string;
}
