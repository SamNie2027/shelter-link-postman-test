import { Rating } from '../app/utils/rating';
import { DayOfWeek } from '../types';

export type NewShelterInput = {
  // shelterId: string; // auto generated
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
  //rating: Rating; // not including for now
  availability: string;
  phone_number: string;
  email_address: string;
  hours: {
    [day in DayOfWeek]: {
      opening_time: string;
      closing_time: string;
    };
  };
  // picture: string; // not including for now
};
