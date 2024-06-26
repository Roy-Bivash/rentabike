import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { DeposerVeloDto } from './dto/deposer-velo.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }
  @Post('deposer')
  deposerVelo(@Body() deposerVeloDto:DeposerVeloDto,@Session() session: any) {
    return this.reservationService.deposerVelo(deposerVeloDto.station_id, deposerVeloDto.commentaire, deposerVeloDto.vote, deposerVeloDto.fonctionnel, session);
  }

  @Post('new')
  createNewReservation(@Body() createReservationDto: CreateReservationDto, @Session() session: any) {
    return this.reservationService.createNewReservation(createReservationDto, session);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
