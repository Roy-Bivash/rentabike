import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('message')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    raison: string;

    @Column()
    mail: string;

    @Column()
    content: string;
}
