import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Shelter } from '../../shelters/shelter.entity';
import { Rating } from '../utils/rating';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: User;

  @Column()
  shelter: Shelter;

  @Column()
  rating: Rating;

  @Column({ length: 1000 })
  reviewText: string;

  @Column({ type: 'date' })
  reviewDate: string;

  @Column()
  private _pictures: string; // Store as a URL-encoded string

  get pictures(): string[] {
    return this._pictures ? decodeURIComponent(this._pictures).split(',') : [];
  }

  set pictures(value: string[]) {
    this._pictures = encodeURIComponent(value.join(','));
  }

  private _tags: string[] = [];

  get tags(): string[] {
    return this._tags;
  }

  addTag(tag: string): void {
    if (tag && !this._tags.includes(tag)) {
      this._tags.push(tag);
    }
  }

  removeTag(tag: string): void {
    this._tags = this._tags.filter((t) => t !== tag);
  }
}
