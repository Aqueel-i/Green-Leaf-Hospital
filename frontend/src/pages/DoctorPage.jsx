import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      <motion.h2
        className="text-3xl font-extrabold text-gray-800 border-b-4 border-teal-500 pb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {editingDoctor ? "Edit Doctor" : "Add Doctor"}
      </motion.h2>

      {/* Form for Adding or Editing */}
      <DoctorForm onSubmit={handleAddOrUpdate} initialData={editingDoctor} />

      <hr className="my-4" />

      <motion.h3
        className="text-2xl font-semibold text-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        All Doctors
      </motion.h3>

      {/* List of doctors */}
      <DoctorList doctors={doctors} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DoctorPage;
