import { PartialType } from '@nestjs/mapped-types';
import { CreateVeloDto } from './create-velo.dto';

export class UpdateVeloDto extends PartialType(CreateVeloDto) {}
