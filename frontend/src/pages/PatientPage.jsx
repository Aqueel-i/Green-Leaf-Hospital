// src/pages/PatientPage.jsx
import React, { useEffect, useState } from "react";
import PatientForm from "../components/patients/PatientForm";
import PatientList from "../components/patients/PatientList";
import {
  getAllPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../services/patientService";

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  // Fetch patients on mount
  useEffect(() => {
    loadPatients();
  }, []);

  // Load all patients
  const loadPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error loading patients:", error);
    }
  };

  // Add or update patient
  const handleAddOrUpdate = async (patientData) => {
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.id, patientData);
        setEditingPatient(null);
      } else {
        await addPatient(patientData);
      }
      loadPatients();
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  // Edit patient
  const handleEdit = (patient) => {
    setEditingPatient(patient);
  };

  // Delete patient
  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      loadPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold">
        {editingPatient ? "Edit Patient" : "Add Patient"}
      </h2>

      <PatientForm onSubmit={handleAddOrUpdate} initialData={editingPatient} />

      <hr className="my-4" />

      <h3 className="text-xl font-semibold">All Patients</h3>

      <PatientList
        patients={patients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PatientPage;
