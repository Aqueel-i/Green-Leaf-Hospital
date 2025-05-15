import axios from "axios";

const API_URL = "http://localhost:5000/appointments";

export async function getAppointments() {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch {
    throw new Error("Failed to fetch appointments");
  }
}

export async function createAppointment(data) {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create appointment");
  }
}

export async function updateAppointment(id, data) {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to update appointment");
  }
}

export async function deleteAppointment(id) {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch {
    throw new Error("Failed to delete appointment");
  }
}
