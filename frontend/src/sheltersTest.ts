export type Shelter = {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  emoji: string;
};

export const shelters: Shelter[] = [
  {
    id: 1,
    title: 'Shelter One',
    description: 'Sample description of Shelter One',
    latitude: 42.3611,
    longitude: -71.0579,
    emoji: '🏳️‍🌈',
  },
  {
    id: 2,
    title: 'Shelter Two',
    description: 'Sample description of Shelter Two',
    latitude: 42.3584,
    longitude: -71.065,
    emoji: '🏳️‍⚧️',
  },
  {
    id: 3,
    title: 'Shelter Three',
    description: 'Sample description of Shelter Three',
    latitude: 42.2995,
    longitude: -71.0649,
    emoji: '🔅',
  },
  {
    id: 4,
    title: 'Shelter Four',
    description: 'Sample description of Shelter Four',
    latitude: 42.3657,
    longitude: -71.0824,
    emoji: '🩵',
  },
];
