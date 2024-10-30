import axios from 'axios';
// Also there is probably already something here that is already created
interface Shelter {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distance?: string; // Optional, as it might only be present in proximity queries
  [key: string]: any; // Allow additional fields if needed
}

const API_BASE_URL = 'http://localhost:3000/shelters'; // Replace with backend URL

// Get all shelters
export const getAllShelters = async (): Promise<Shelter[]> => {
  try {
    const response = await axios.get<Shelter[]>(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shelters:', error);
    throw error;
  }
};

// Get shelter by ID
export const getShelterById = async (id: number): Promise<Shelter> => {
  try {
    const response = await axios.get<Shelter>(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching shelter with ID ${id}:`, error);
    throw error;
  }
};

// Get shelters by proximity
export const getSheltersByProximity = async (
  lat: number,
  lon: number,
  limit: number = 10
): Promise<Shelter[]> => {
  try {
    const response = await axios.get<Shelter[]>(`${API_BASE_URL}/proximity`, {
      params: { lat, lon, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shelters by proximity:', error);
    throw error;
  }
};

// Create a new shelter
export const createShelter = async (
  shelterData: Partial<Shelter>
): Promise<Shelter> => {
  try {
    const response = await axios.post<Shelter>(`${API_BASE_URL}`, shelterData);
    return response.data;
  } catch (error) {
    console.error('Error creating shelter:', error);
    throw error;
  }
};

// Update an existing shelter
export const updateShelter = async (
  id: number,
  shelterData: Partial<Shelter>
): Promise<Shelter> => {
  try {
    const response = await axios.put<Shelter>(
      `${API_BASE_URL}/${id}`,
      shelterData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating shelter with ID ${id}:`, error);
    throw error;
  }
};

// Delete a shelter
export const deleteShelter = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting shelter with ID ${id}:`, error);
    throw error;
  }
};
