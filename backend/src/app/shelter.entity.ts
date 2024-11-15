import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';
import { IsLatitude, IsLongitude, IsPhoneNumber, IsEmail} from 'class-validator';

@Entity()
export class Shelter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 255})
  name: string;

  @Column()
  address: Address;

  @Column()
  @IsLatitude()
  latitude: number;

  @Column()
  @IsLongitude()
  longitude: number;

  @Column({length: 500})
  description: string;

  private _overall_rating: number;
  private _inclusivity_rating: number;
  private _safety_rating: number;

  @Column()
  set overall_rating(value: number) {
    this.setRating('overall', value);
  }

  get overall_rating(): number {
    return this._overall_rating;
  }

  @Column()
  set inclusivity_rating(value: number) {
    this.setRating('inclusivity', value);
  }

  get inclusivity_rating(): number {
    return this._inclusivity_rating;
  }

  @Column()
  set safety_rating(value: number) {
    this.setRating('safety', value);
  }

  get safety_rating(): number {
    return this._safety_rating;
  }

  private setRating(type: 'overall' | 'inclusivity' | 'safety', value: number): void {
    if (value < 1 || value > 5) {
      throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} rating must be between 1 and 5.`);
    }
    this[`_${type}_rating`] = value;
  }

  @Column()
  availability: string; // unknown

  @Column()
  @IsPhoneNumber()
  phone_number: string;

  @Column()
  @IsEmail()
  email_address: string;

  @Column({type: 'time'})
  opening_time: string;

  @Column({type: 'time'})
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