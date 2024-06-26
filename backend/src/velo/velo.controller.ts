import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VeloService } from './velo.service';
import { CreateVeloDto } from './dto/create-velo.dto';
import { UpdateVeloDto } from './dto/update-velo.dto';
import { InsertVeloDto } from './dto/insert-velo.dto';
import { UpdateFunctionnal } from './dto/update-functionnal.dto';

@Controller('velo')
export class VeloController {
  constructor(private readonly veloService: VeloService) {}

  @Post()
  create(@Body() createVeloDto: CreateVeloDto) {
    return this.veloService.create(createVeloDto);
  }

  @Get()
  findAll() {
    return this.veloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veloService.findOne(+id);
  }

  @Post('new')
  insertNew(@Body() insertVeloDto: InsertVeloDto) {
    return this.veloService.insertNewVelo(insertVeloDto.station, insertVeloDto.type);
  }

  @Post('updateFunctionnal')
  updateVeloFonctionnel(@Body() updateFunctionnal : UpdateFunctionnal){
    return this.veloService.updateVeloFonctionnel(updateFunctionnal.id, updateFunctionnal.fonctionnel);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVeloDto: UpdateVeloDto) {
    return this.veloService.update(+id, updateVeloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veloService.remove(id);
  }
}
