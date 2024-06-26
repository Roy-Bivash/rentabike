import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('velo')
export class Velo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint', nullable: true  })
    num_station: string;

    @Column({ default: true })
    fonctionnel: boolean;

    @Column()
    date_fabrication: string;

    @Column()
    type: string;
}