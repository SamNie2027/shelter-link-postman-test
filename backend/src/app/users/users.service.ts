import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    // create
    async create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData);
        return await this.usersRepository.save(user);
    }

    // read
    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    // update
    async update(id: number, userData: Partial<User>): Promise<User> {
        await this.usersRepository.update(id, userData);
        return this.findOne(id);
    }

    // delete
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

}