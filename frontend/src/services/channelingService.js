import axios from 'axios';

// Set up base URL for the API (adjust it according to your Flask backend)
const API_URL = 'http://127.0.0.1:5000/channeling'; // Adjust to your backend URL

// Fetch all channeling appointments
export const getAllChannelings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching channeling appointments:', error);
    throw error;
  }
};

// Add a new channeling appointment
export const addChanneling = async (channelingData) => {
  try {
    const response = await axios.post(API_URL, channelingData);
    return response.data;
  } catch (error) {
    console.error('Error adding channeling appointment:', error);
    throw error;
  }
};

// Update an existing channeling appointment
export const updateChanneling = async (id, channelingData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, channelingData);
    return response.data;
  } catch (error) {
    console.error('Error updating channeling appointment:', error);
    throw error;
  }
};

// Delete a channeling appointment
export const deleteChanneling = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting channeling appointment:', error);
    throw error;
  }
};
