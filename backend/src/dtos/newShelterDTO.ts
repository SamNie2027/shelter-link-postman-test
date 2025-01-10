import { Rating } from '../app/utils/rating';
import { AddressModel } from '../shelter/shelter.model';
import { DayOfWeek } from '../types';

export type NewShelterInput = {
  // id: number; // auto generated
  name: string;
  address: AddressModel;
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
