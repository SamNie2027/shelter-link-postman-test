export type Shelter = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  emoji: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }
  overall_rating: number;
  inclusivity_rating: number,
  safety_rating: number,
  availability: string,
  phone_number: string,
  email_address: string,
  opening_time: string,
  closing_time: string,
  picture: string[]
};

export const shelters: Shelter[] = [
  {
    id: 1,
    name: 'Shelter One',
    description: 'Longer description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    latitude: 42.3611,
    longitude: -71.0579,
    emoji: '🏳️‍🌈',
    address: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zipCode: "02108"
    },
    overall_rating: 3.9,
    inclusivity_rating: 4.9,
    safety_rating: 4.7,
    availability: "Open",
    phone_number: "555-0123",
    email_address: "contact@shelter.org",
    opening_time: "09:00:00",
    closing_time: "21:00:00",
    picture: [
      "https://media.istockphoto.com/id/155666671/vector/vector-illustration-of-red-house-icon.jpg?s=612x612&w=0&k=20&c=tBqaabvmjFOBVUibZxbd8oWJqrFR5dy-l2bEDJMtZ40=",
      "https://media.istockphoto.com/id/155666671/vector/vector-illustration-of-red-house-icon.jpg?s=612x612&w=0&k=20&c=tBqaabvmjFOBVUibZxbd8oWJqrFR5dy-l2bEDJMtZ40=",
    ]
  },
  {
    id: 2,
    name: 'Shelter Two',
    description: 'Longer description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    latitude: 42.3584,
    longitude: -71.065,
    emoji: '🏳️‍⚧️',
    address: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zipCode: "02108"
    },
    overall_rating: 4.5,
    inclusivity_rating: 4.9,
    safety_rating: 4.7,
    availability: "Open",
    phone_number: "555-0123",
    email_address: "contact@shelter.org",
    opening_time: "09:00:00",
    closing_time: "21:00:00",
    picture: ["https://media.istockphoto.com/id/155666671/vector/vector-illustration-of-red-house-icon.jpg?s=612x612&w=0&k=20&c=tBqaabvmjFOBVUibZxbd8oWJqrFR5dy-l2bEDJMtZ40="]
  },
  {
    id: 3,
    name: 'Shelter Three',
    description: 'Longer description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    latitude: 42.2995,
    longitude: -71.0649,
    emoji: '🔅',
    address: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zipCode: "02108"
    },
    overall_rating: 4.3,
    inclusivity_rating: 4.9,
    safety_rating: 4.7,
    availability: "Open",
    phone_number: "555-0123",
    email_address: "contact@shelter.org",
    opening_time: "09:00:00",
    closing_time: "21:00:00",
    picture: ["https://media.istockphoto.com/id/155666671/vector/vector-illustration-of-red-house-icon.jpg?s=612x612&w=0&k=20&c=tBqaabvmjFOBVUibZxbd8oWJqrFR5dy-l2bEDJMtZ40="]
  },
  {
    id: 4,
    name: 'Shelter Four',
    description: 'Longer description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    latitude: 42.3657,
    longitude: -71.0824,
    emoji: '🩵',
    address: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zipCode: "02108"
    },
    overall_rating: 4.2,
    inclusivity_rating: 4.9,
    safety_rating: 4.7,
    availability: "Open",
    phone_number: "555-0123",
    email_address: "contact@shelter.org",
    opening_time: "09:00:00",
    closing_time: "21:00:00",
    picture: ["https://media.istockphoto.com/id/155666671/vector/vector-illustration-of-red-house-icon.jpg?s=612x612&w=0&k=20&c=tBqaabvmjFOBVUibZxbd8oWJqrFR5dy-l2bEDJMtZ40="]
  },
];
