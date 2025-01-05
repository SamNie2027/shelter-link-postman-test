import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';
import {
  IsLatitude,
  IsLongitude,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';
import { Rating } from '../app/utils/rating';

@Entity()
export class Shelter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column()
  address: Address;

  @Column()
  @IsLatitude()
  latitude: number;

  @Column()
  @IsLongitude()
  longitude: number;

  @Column({ length: 500 })
  description: string;

  @Column()
  rating: Rating;

  @Column()
  availability: string; // unknown

  @Column()
  @IsPhoneNumber()
  phone_number: string;

  @Column()
  @IsEmail()
  email_address: string;

  @Column({ type: 'time' })
  opening_time: string;

  @Column({ type: 'time' })
  closing_time: string;

  @Column()
  private _picture: string; // Store as a URL-encoded string

  get picture(): string[] {
    return this._picture ? decodeURIComponent(this._picture).split(',') : [];
  }

  set picture(value: string[]) {
    this._picture = encodeURIComponent(value.join(','));
  }
}
