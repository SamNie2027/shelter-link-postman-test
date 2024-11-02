import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';
import { User } from './users.entity';
import { IsLatitude, IsLongitude, IsPhoneNumber, IsEmail} from 'class-validator';
import { Shelter } from './shelter.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: User;

  @Column()
  shelter: Shelter;

  @Column({length: 1000})
  reviewText: string;

  @Column({type: 'date'})
  reviewDate: string;

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
  private _pictures: string; // Store as a URL-encoded string

  get pictures(): string[] {
    return this._pictures ? decodeURIComponent(this._pictures).split(',') : [];
  }

  set pictures(value: string[]) {
    this._pictures = encodeURIComponent(value.join(','));
  }
}