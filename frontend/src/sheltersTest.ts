export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export type Shelter = {
  id: number;
  name: string;
  address: Address;
  latitude: number;
  longitude: number;
  description: string;
  overall_rating: number;
  inclusivity_rating: number;
  safety_rating: number;
  availability: string;
  phone_number: string;
  email_address: string;
  opening_time: string;
  closing_time: string;
  picture: string[];
  emoji: string;
};

export const shelters: Shelter[] = [
  {
    id: 1,
    name: 'Shelter One',
    description:
      'The world can be a scary place for LGBTQ+ youth, no matter where they live. If you are facing homelessness, trying to find a reason to hang on one more day, or just looking to make some new friends - BAGLY is here for you. We are a youth-led and adult-supported organization thats been on your side for over 40 years and we welcome you.',
    latitude: 42.3611,
    longitude: -71.0579,
    emoji: '🏳️‍🌈',
    address: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
    },
    overall_rating: 3.9,
    inclusivity_rating: 4.9,
    safety_rating: 4.7,
    availability: 'Open',
    phone_number: '555-0123',
    email_address: 'contact@shelter.org',
    opening_time: '09:00:00',
    closing_time: '21:00:00',
    picture: [
      'https://www.bostonherald.com/wp-content/uploads/2020/07/best018.jpg?w=978',
      'https://www.bostonherald.com/wp-content/uploads/2020/07/best018.jpg?w=978',
    ],
  },
  {
    id: 2,
    name: 'Shelter Two',
    description: 'Longer description 2',
    latitude: 42.3584,
    longitude: -71.065,
    emoji: '🏳️‍⚧️',
    address: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
    },
    overall_rating: 4.5,
    inclusivity_rating: 4.9,
    safety_rating: 4.7,
    availability: 'Open',
    phone_number: '555-0123',
    email_address: 'contact@shelter.org',
    opening_time: '09:00:00',
    closing_time: '21:00:00',
    picture: [
      'https://www.bostonherald.com/wp-content/uploads/2020/07/best018.jpg?w=978',
      'https://www.bostonherald.com/wp-content/uploads/2020/07/best018.jpg?w=978',
    ],
  },
  {
    id: 3,
    name: 'Shelter Three',
    description: 'Longer description 3',
    latitude: 42.2995,
    longitude: -71.0649,
    emoji: '🔅',
    address: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
    },
    overall_rating: 4.3,
    inclusivity_rating: 4.9,
    safety_rating: 4.7,
    availability: 'Open',
    phone_number: '555-0123',
    email_address: 'contact@shelter.org',
    opening_time: '09:00:00',
    closing_time: '21:00:00',
    picture: [
      'https://www.bostonherald.com/wp-content/uploads/2020/07/best018.jpg?w=978',
      'https://www.bostonherald.com/wp-content/uploads/2020/07/best018.jpg?w=978',
    ],
  },
  {
    id: 4,
    name: 'Shelter Four',
    description: 'Longer description 4',
    latitude: 42.3657,
    longitude: -71.0824,
    emoji: '🩵',
    address: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
    },
    overall_rating: 4.2,
    inclusivity_rating: 4.9,
    safety_rating: 4.7,
    availability: 'Open',
    phone_number: '555-0123',
    email_address: 'contact@shelter.org',
    opening_time: '09:00:00',
    closing_time: '21:00:00',
    picture: [
      'https://www.bostonherald.com/wp-content/uploads/2020/07/best018.jpg?w=978',
      'https://www.bostonherald.com/wp-content/uploads/2020/07/best018.jpg?w=978',
    ],
  },
];
