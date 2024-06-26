import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  // Get current date :
  getCurrentDateFormated(){
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  getCurrentTimeFormated() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  async createNewReservation(createReservationDto: CreateReservationDto, session: any) {
    // Recuperer la liste de tous les velo existant par type choisi ainsi que station choisi :
    const queryListVelo = `SELECT velo.id FROM velo WHERE velo.fonctionnel = true AND velo.type = ? AND velo.num_station = ?;`;
    const resultVelo = await this.reservationRepository.query(queryListVelo, [createReservationDto.type_velo, createReservationDto.station_id]);
    if (resultVelo.length < 1) {
      return {
        success: false,
        message: `Pas de velo ${createReservationDto.type_velo} disponible`,
      };
    }

    // On prend le premier velo de la liste, c'est celui qui sera utilisé :
    const idVeloUtilise = resultVelo[0].id;

    // Retirer la disponibilité du velo dans la station en retirant le num_station
    const queryRetirerDispoVelo = "UPDATE `velo` SET num_station=NULL WHERE id=?";
    await this.reservationRepository.query(queryRetirerDispoVelo, [idVeloUtilise]);

    // Mettre le velo utilisé dans la session :
    session.user.course = {
      type_velo: createReservationDto.type_velo,
      id_velo: idVeloUtilise,
      start: {
        date: this.getCurrentDateFormated(),
        time: this.getCurrentTimeFormated()
      },
      station_depart: createReservationDto.station_id,
    };

    // Retourner une information de success :
    return {
      success: true,
      message: 'Bike reserved successfully',
    };
  }


  async deposerVelo(id_station:string, commentaire:string, vote:string, fonctionnel:boolean, session: any){
    // Recuperer les infos de la cours en cours :
    const currentRide = session.user.course;

    // Mettre a jour le velo dans la base avec la station ou elle a été deposé :
    const queryDeposerVelo = "UPDATE `velo` SET num_station=?, fonctionnel=? WHERE id=?";
    await this.reservationRepository.query(queryDeposerVelo, [id_station, fonctionnel, currentRide.id_velo]);

    // Ajouter l'historique :
    const queryNewHistory = "INSERT INTO `historique`(`num_velib`, `num_user`, `date_depart`, `date_arrive`, `heure_depart`, `heure_arrive`, `num_station_depart`, `num_station_arrive`, `commentaire`, `vote`) VALUES (?,?,?,?,?,?,?,?,?,?)";
    await this.reservationRepository.query(queryNewHistory, 
      [
        currentRide.id_velo, 
        session.user.id, 
        currentRide.start.date, 
        this.getCurrentDateFormated(), 
        currentRide.start.time, 
        this.getCurrentTimeFormated(), 
        currentRide.station_depart, 
        id_station, 
        commentaire, 
        vote
      ]
    )
    
    // Vider la valeur velo de la session :
    session.user.course = null;
    
    return {
      success: true,
      message: 'Depot fait',
    };
  }


  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
