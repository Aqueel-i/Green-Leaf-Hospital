import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

const PatientList = ({ patients, onEdit, onDelete }) => {
  if (!patients.length) {
    return <p className="text-center text-gray-500">No patients found.</p>;
  }

  return (
    <ul className="space-y-4">
      {patients.map((patient) => (
        <motion.li
          key={patient.id}
          className="bg-white p-5 rounded-lg shadow flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{patient.name}</h4>
            <p className="text-gray-600">
              Age: {patient.age} | Gender: {patient.gender}
            </p>
            <p className="text-gray-500 text-sm">{patient.email}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onEdit(patient)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <FaEdit />
              Edit
            </button>
            <button
              onClick={() => onDelete(patient.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        </motion.li>
      ))}
    </ul>
  );
};

export default PatientList;
