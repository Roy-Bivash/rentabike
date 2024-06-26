import { Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class StationService {

  constructor(
    @InjectRepository(Station)
    private readonly StationRepository: Repository<Station>,
  ) {}

  create(createStationDto: CreateStationDto) {
    return 'This action adds a new station';
  }

  findAll() {
    return this.StationRepository.find();
  }

  async findStationsWithBikeCounts() {
    const query = `
      SELECT 
          s.id, 
          s.station_id, 
          s.nom, 
          s.latitude, 
          s.longitude, 
          s.nb_max,
          COUNT(CASE WHEN v.type = 'electrique' AND v.fonctionnel = 1 THEN 1 END) AS nb_electrique,
          COUNT(CASE WHEN v.type = 'mecanique' AND v.fonctionnel = 1 THEN 1 END) AS nb_mecanique
      FROM 
          station s
      LEFT JOIN 
          velo v
      ON 
          s.id = v.num_station
      GROUP BY 
          s.id, 
          s.station_id, 
          s.nom, 
          s.latitude, 
          s.longitude, 
          s.nb_max;

    `;
    return await this.StationRepository.query(query);
  }

  async findStationsWithDefectBikeCounts() {
    const query = `
    SELECT velo.id, station.nom as station_nom, velo.type, velo.date_fabrication
    FROM velo
    INNER JOIN station
    ON velo.num_station = station.id
    WHERE fonctionnel = 0;
    `;
    return await this.StationRepository.query(query);
  }

  async findOne(id: string) {
    // return this.StationRepository.findOne({ where : { id }})
    const query = `
      SELECT 
          s.id, 
          s.station_id, 
          s.nom, 
          s.latitude, 
          s.longitude, 
          s.nb_max,
          COUNT(CASE WHEN v.type = 'electrique' AND v.fonctionnel = 1 THEN 1 END) AS nb_electrique,
          COUNT(CASE WHEN v.type = 'mecanique' AND v.fonctionnel = 1 THEN 1 END) AS nb_mecanique
      FROM 
          station s
      LEFT JOIN 
          velo v
      ON 
          s.id = v.num_station
      WHERE s.id = ?
      GROUP BY 
          s.id, 
          s.station_id, 
          s.nom, 
          s.latitude, 
          s.longitude, 
          s.nb_max;

    `;
    const result = await this.StationRepository.query(query, [id]);
    return result.length > 0 ? result[0] : {};
  }

  update(id: number, updateStationDto: UpdateStationDto) {
    return `This action updates a #${id} station`;
  }

  remove(id: number) {
    return `This action removes a #${id} station`;
  }
}
