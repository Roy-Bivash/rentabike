import { Injectable } from '@nestjs/common';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';
import { Historique } from './entities/historique.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HistoriqueService {
  constructor(
    @InjectRepository(Historique)
    private readonly historiqueRepository: Repository<Historique>
  ) {}

  create(createHistoriqueDto: CreateHistoriqueDto) {
    return 'This action adds a new historique';
  }

  findHistoryOfVelo(id: string){
    return this.historiqueRepository.find({ where: { num_velib: parseInt(id) }})
  }

  async userHistory(session: any){
    const query = `SELECT 
        h.num_user,
        h.num_velib,
        h.date_depart,
        h.date_arrive,
        h.heure_depart,
        h.heure_arrive,
        s_depart.nom AS nom_station_depart,
        s_arrive.nom AS nom_station_arrive,
        h.commentaire,
        h.vote
    FROM 
        historique h
    JOIN 
        station s_depart ON h.num_station_depart = s_depart.id
    JOIN 
        station s_arrive ON h.num_station_arrive = s_arrive.id
    WHERE 
        h.num_user = ?; 
    `;

    const data = await this.historiqueRepository.query(query, [session.user.id]);
    return data;
  }

  findAll() {
    return `This action returns all historique`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historique`;
  }

  update(id: number, updateHistoriqueDto: UpdateHistoriqueDto) {
    return `This action updates a #${id} historique`;
  }

  remove(id: number) {
    return `This action removes a #${id} historique`;
  }
}
