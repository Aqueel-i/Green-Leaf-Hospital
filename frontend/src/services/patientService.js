import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/patients";

// Get all patients
export const getAllPatients = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// Add a new patient
export const addPatient = async (patientData) => {
  const res = await axios.post(BASE_URL, patientData);
  return res.data;
};

// Update a patient
export const updatePatient = async (id, patientData) => {
  const res = await axios.put(`${BASE_URL}/${id}`, patientData);
  return res.data;
};

// Delete a patient
export const deletePatient = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
