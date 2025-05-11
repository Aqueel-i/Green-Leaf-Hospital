import React, { useEffect, useState } from "react";
import PatientForm from "../components/patients/PatientForm";
import PatientList from "../components/patients/PatientList";
import {
  getAllPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../services/patientService";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Add icons

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (err) {
      console.error("Error loading patients:", err);
    }
  };

  const handleAddOrUpdate = async (patientData) => {
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.id, patientData);
        setEditingPatient(null);
      } else {
        await addPatient(patientData);
      }
      loadPatients();
    } catch (err) {
      console.error("Error adding/updating patient:", err);
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      loadPatients();
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          {editingPatient ? "Edit Patient" : "Add Patient"}
        </h2>
        <button
          onClick={() => setEditingPatient(null)}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          {editingPatient ? "Cancel Editing" : "Add New Patient"}
        </button>
      </div>

      <PatientForm onSubmit={handleAddOrUpdate} initialData={editingPatient} />

      <hr className="border-gray-300 my-8" />

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Patient List</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.length === 0 ? (
          <div className="text-center text-gray-500">No patients available.</div>
        ) : (
          patients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transform transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold text-teal-600">{patient.name}</h4>
                <button
                  onClick={() => handleEdit(patient)}
                  className="text-teal-500 hover:text-teal-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-gray-700">Specialization: {patient.specialization}</p>
              <p className="text-gray-700">Contact: {patient.contact}</p>
              <p className="text-gray-700">Email: {patient.email}</p>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setEditingPatient(null)}
        className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transform transition-all duration-300 hover:scale-110"
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default PatientPage;
