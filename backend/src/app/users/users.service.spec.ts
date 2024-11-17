import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';

const mockUsersRepository = () => ({
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(),
});

describe('UsersService', () => {
    let service: UsersService;
    let UsersRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useFactory: mockUsersRepository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        UsersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result = [new User(), new User()];
            jest.spyOn(UsersRepository, 'find').mockResolvedValue(result);

            expect(await service.findAll()).toBe(result);
            expect(UsersRepository.find).toHaveBeenCalled();
        });
    });

    describe('create', () => {
        it('should successfully create a user', async () => {
            const userData = { name: 'Max' };
            const user = new User();
            jest.spyOn(UsersRepository, 'create').mockReturnValue(user);
            jest.spyOn(UsersRepository, 'save').mockResolvedValue(user);

            expect(await service.create(userData)).toBe(user);
            expect(UsersRepository.create).toHaveBeenCalledWith(userData);
            expect(UsersRepository.save).toHaveBeenCalledWith(user);
        });
    });

    describe('findOne', () => {
        it('should return a user by ID', async () => {
            const user = new User();
            jest.spyOn(UsersRepository, 'findOneBy').mockResolvedValue(user);

            expect(await service.findOne(1)).toBe(user);
            expect(UsersRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
        });
    });

    describe('update', () => {
        it('should update and return the updated user', async () => {
            const userData = { name: 'Max Norman' };
            const user = new User();
            jest.spyOn(UsersRepository, 'update').mockResolvedValue(undefined);
            jest.spyOn(service, 'findOne').mockResolvedValue(user);

            expect(await service.update(1, userData)).toBe(user);
            expect(UsersRepository.update).toHaveBeenCalledWith(1, userData);
        });
    });

    describe('remove', () => {
        it('should delete a user by ID', async () => {
            jest.spyOn(UsersRepository, 'delete').mockResolvedValue(undefined);

            await service.remove(1);
            expect(UsersRepository.delete).toHaveBeenCalledWith(1);
        });
    });
});