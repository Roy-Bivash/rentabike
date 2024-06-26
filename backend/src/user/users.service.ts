import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly utilisateurRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const user = this.utilisateurRepository.create({
      ...createUserDto,
      mdp: bcrypt.hashSync(createUserDto.password, 10),  // Utiliser 'mdp' au lieu de 'password'
      role: 'client',
    });
    await this.utilisateurRepository.save(user);
    return {
      success: true,
      message: 'User created successfully',
    };
  }

  async getUsers(): Promise<any> {
    const users = await this.utilisateurRepository.find();
    return users.map(user => ({
      id_user: user.id_user,  // Utiliser 'id_user' au lieu de 'id'
      nom: user.nom,
      prenom: user.prenom,
      mail: user.mail,
      tel: user.tel,
      role: user.role,
    }));
  }

  async changeRole(changeRoleDto: ChangeRoleDto): Promise<any> {
    const user = await this.utilisateurRepository.findOne({ where: { id_user: changeRoleDto.userId } });  // Utiliser 'id_user' au lieu de 'id'
    if (user) {
      user.role = changeRoleDto.role;
      await this.utilisateurRepository.save(user);
      return {
        success: true,
        message: 'Role changed successfully',
      };
    }
    return {
      success: false,
      message: 'User not found',
    };
  }

  async getMapInfo(): Promise<any> {
    return [
      {
        station_id: 1,
        name: 'Station 1',
        lat: 40.712776,
        lon: -74.005974,
        capacity: 20,
        stationCode: 'ST001',
        velo: { mecanique: 5, electrique: 3 },
        libre: 12,
      },
      // Add more stations as needed
    ];
  }

  async getCurrentUser(session: any): Promise<any> {
    if (session.user) {
      return {
        logged: true,
        type: session.user.type,
        infos: {
          nom: session.user.nom,
          prenom: session.user.prenom,
          email: session.user.email,
        },
        cours: {
          used: session.user.course ? true : false,
          velo: session.user.course || null,
        },
        // test: session.user.id
      };
    }
    return {
      logged: false,
      type: null,
      infos: null,
      cours: {
        used: false,
        velo: null,
      },
    };
  }
}
