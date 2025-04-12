// src/pages/DoctorPage.jsx
import React, { useEffect, useState } from "react";
import DoctorForm from "../components/doctors/DoctorForm";
import DoctorList from "../components/doctors/DoctorList";
import {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorService";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Fetch doctors when component mounts
  useEffect(() => {
    loadDoctors();
  }, []);

  // Load doctor data
  const loadDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error("Error loading doctors:", error);
    }
  };

  // Add or Update doctor
  const handleAddOrUpdate = async (doctorData) => {
    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor.id, doctorData);
        setEditingDoctor(null);
      } else {
        await addDoctor(doctorData);
      }
      loadDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  // Handle edit click
  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
  };

  // Handle delete click
  const handleDelete = async (id) => {
    try {
      await deleteDoctor(id);
      loadDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">
        {editingDoctor ? "Edit Doctor" : "Add Doctor"}
      </h2>

      {/* Form for Adding or Editing */}
      <DoctorForm onSubmit={handleAddOrUpdate} initialData={editingDoctor} />

      <hr className="my-4" />

      <h3 className="text-xl font-semibold">All Doctors</h3>

      {/* List of doctors */}
      <DoctorList
        doctors={doctors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DoctorPage;
