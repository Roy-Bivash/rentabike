import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  mdp: string;

  @Column()
  tel: string;

  @Column()
  role: string;

  @Column()
  mail: string;
}
