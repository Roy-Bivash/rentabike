import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('historique')
export class Historique {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    num_velib:number;

    @Column()
    num_user: number;

    @Column({ type: "date" })
    date_depart: Date;

    @Column({ type: "date" })
    date_arrive: Date;

    @Column('text')
    heure_depart: string;

    @Column('text')
    heure_arrive: string;

    @Column({ type: 'bigint' })
    num_station_depart: string;

    @Column({ type: 'bigint' })
    num_station_arrive: string;

    @Column('text')
    commentaire: string;

    @Column('text')
    vote: string;
}

