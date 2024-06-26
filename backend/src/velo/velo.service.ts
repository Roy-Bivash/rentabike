import { Injectable } from '@nestjs/common';
import { CreateVeloDto } from './dto/create-velo.dto';
import { UpdateVeloDto } from './dto/update-velo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Velo } from './entities/velo.entity';

@Injectable()
export class VeloService {
  constructor(
    @InjectRepository(Velo) 
    private readonly veloRepository: Repository<Velo>
  ) {}


  create(createVeloDto: CreateVeloDto) {
    return 'This action adds a new velo';
  }

  findAll() {
    return `This action returns all velo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} velo`;
  }

  update(id: number, updateVeloDto: UpdateVeloDto) {
    return `This action updates a #${id} velo`;
  }

  remove(id: string) {
    return `This action removes a #${id} velo`;
  }

  async insertNewVelo(station: string, type: string){
    // Get current date :
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();



    const newVelo = this.veloRepository.create({
      num_station:station,
      fonctionnel: true,
      date_fabrication: `${year}-${month}-${day}`,
      type: type
    })
    await this.veloRepository.save(newVelo);
    return {
      success: true,
      message: "Velo créer"
    };
  }


  async updateVeloFonctionnel(id: string, fonctionnel: boolean) {
    const velo = await this.veloRepository.findOne({ where: { id: parseInt(id, 10) } });

    if (!velo) {
        return {
            success: false,
            message: "Velo not found"
        };
    }

    velo.fonctionnel = fonctionnel;
    await this.veloRepository.save(velo);

    return {
        success: true,
        message: "Update successful",
    };
}


}
