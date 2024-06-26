import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto, session: any): Promise<any> {
    const user = await this.userRepository.findOne({ where: { mail: loginDto.email } });
    if (user && bcrypt.compareSync(loginDto.password, user.mdp)) {
      session.user = {
        id: user.id_user,
        nom: user.nom,
        prenom: user.prenom,
        email: user.mail,
        type: user.role,
      };
      return {
        success: true,
        message: 'Login successful',
        type: user.role,
      };
    }
    return {
      success: false,
      message: 'Invalid credentials',
      type: null,
    };
  }

  async logout(session: any): Promise<any> {
    session.destroy();
    return {
      success: true,
      message: 'Logged out successfully',
    };
  }
}
