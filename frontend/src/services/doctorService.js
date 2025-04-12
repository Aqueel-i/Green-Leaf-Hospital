import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/doctors'; // Adjust URL to match your Flask server

// Fetch all doctors
export const getDoctors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// Add a new doctor
export const addDoctor = async (doctor) => {
  try {
    const response = await axios.post(API_URL, doctor);
    return response.data;
  } catch (error) {
    console.error('Error adding doctor:', error);
    throw error;
  }
};

// Update a doctor
export const updateDoctor = async (id, doctor) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, doctor);
    return response.data;
  } catch (error) {
    console.error('Error updating doctor:', error);
    throw error;
  }
};

// Delete a doctor
export const deleteDoctor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting doctor:', error);
    throw error;
  }
};
