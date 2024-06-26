import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { HistoriqueService } from './historique.service';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';

@Controller('historique')
export class HistoriqueController {
  constructor(private readonly historiqueService: HistoriqueService) {}

  @Post()
  create(@Body() createHistoriqueDto: CreateHistoriqueDto) {
    return this.historiqueService.create(createHistoriqueDto);
  }

  @Get('historyVelo/:id')
  findHistoryOfVelo(@Param('id') id: string){
    return this.historiqueService.findHistoryOfVelo(id);
  }

  @Get('me')
  getHistoriqueByUser(@Session() session: any){
    return this.historiqueService.userHistory(session);
  }

  @Get()
  findAll() {
    return this.historiqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiqueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoriqueDto: UpdateHistoriqueDto) {
    return this.historiqueService.update(+id, updateHistoriqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiqueService.remove(+id);
  }
}
