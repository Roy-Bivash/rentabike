import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}


  async create(createMessageDto: CreateMessageDto) {
    const msg = await this.messageRepository.create({ raison:createMessageDto.raison, mail:createMessageDto.mail, content:createMessageDto.content });
    await this.messageRepository.save(msg)

    return {
      success: true,
      message: 'Message created successfully',
    };
  }

  findAll() {
    return this.messageRepository.find();
  }

  findOne(id: number): Promise<Message | null> {
    return this.messageRepository.findOne({ where: { id } });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async remove(id: number) {
    const result = await this.messageRepository.delete(id);
    if (result.affected === 0) {
      return {
        success: false,
        message: `The message does not exist`,
      };
    }
    return {
      success: true,
      message: `Message deleted`,
    };
  }
  
}
