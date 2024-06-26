import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('station')
export class Station {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column({ type: 'bigint' })
    station_id: string;

    @Column('text')
    nom: string;

    @Column('text')
    latitude: string;

    @Column('text')
    longitude: string;

    @Column()
    nb_max: number;
}
