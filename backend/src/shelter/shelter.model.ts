import { Rating } from '../app/utils/rating';
import { DayOfWeek } from '../types';

/**
 * Represents the model schema of a shelter.
 */
export type ShelterModel = {
  shelterId: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
  latitude: number;
  longitude: number;
  description: string;
  rating?: Rating;
  availability: string;
  phone_number: string;
  email_address: string;
  hours: {
    [day in DayOfWeek]: {
      opening_time: string;
      closing_time: string;
    };
  };
  picture?: string;
};

export type ShelterInputModel = {
  shelterId: { S: string };
  name: { S: string };
  address: {
    M: {
      street: { S: string };
      city: { S: string };
      state: { S: string };
      zipCode: { S: string };
      country?: { S: string };
    };
  };
  latitude: { N: string };
  longitude: { N: string };
  description: { S: string };
  rating?: { S: Rating };
  availability: { S: string };
  phone_number: { S: string };
  email_address: { S: string };
  hours: {
    M: {
      [day in DayOfWeek]: {
        M: { opening_time: { S: string }; closing_time: { S: string } };
      };
    };
  };
  picture?: { S: string };
};
