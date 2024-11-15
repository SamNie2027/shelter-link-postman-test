import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail} from 'class-validator';

enum UserOptions {
    NormalUser,
    ShelterAdmin,
    BaglyAdmin
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column()
    @IsEmail()
    email_address: string;

    // role: unfinished
    @Column()
    role: UserOptions;

    @Column()
    verified: boolean;

    @Column()
    private age: number;

    set set_age(value: number){
        if (value < 0){
            value = 0;
        }
        else {
            this.age = value;
        }
    }

    get get_age(): number{
        return this.age;
    }

    @Column({type: 'time'})
    joined_at: string;

}