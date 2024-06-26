import { Module } from '@nestjs/common';
import { VeloService } from './velo.service';
import { VeloController } from './velo.controller';
import { Velo } from './entities/velo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Velo])],
  controllers: [VeloController],
  providers: [VeloService],
})
export class VeloModule {}
