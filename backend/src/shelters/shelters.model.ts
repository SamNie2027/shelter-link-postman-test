import { Rating } from '../app/utils/rating';
import { DayOfWeek } from '../types';
/**
 * Represents the model schema of an address
 */
export type AddressModel = {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
};

/**
 * Represents the model schema of a shelter.
 */
export type ShelterModel = {
  id: number;
  name: string;
  address: AddressModel;
  latitude: number;
  longitude: number;
  description: string;
  rating: Rating;
  availability: string;
  phone_number: string;
  email_address: string;
  hours: {
    [day in DayOfWeek]: {
      opening_time: string;
      closing_time: string;
    };
  };
  picture: string;
};

export type ShelterInputModel = {
  id: { S: number };
  name: { S: string };
  address: { M: AddressModel };
  latitude: { N: number };
  longitude: { N: number };
  description: { S: string };
  rating: { S: Rating };
  availability: { S: string };
  phone_number: { S: string };
  email_address: { S: string };
  hours: {
    [day in DayOfWeek]: {
      opening_time: { S: string };
      closing_time: { S: string };
    };
  };
  picture: { S: string };
};
