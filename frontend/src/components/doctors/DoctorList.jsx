import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

const DoctorList = ({ doctors, onEdit, onDelete }) => {
  if (!doctors.length) {
    return <p className="text-center text-gray-500">No doctors found.</p>;
  }

  return (
    <ul className="space-y-4">
      {doctors.map((doctor) => (
        <motion.li
          key={doctor.id}
          className="bg-white p-5 rounded-lg shadow flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{doctor.name}</h4>
            <p className="text-gray-600">{doctor.specialty}</p>
            <p className="text-gray-500 text-sm">{doctor.email}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onEdit(doctor)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <FaEdit />
              Edit
            </button>
            <button
              onClick={() => onDelete(doctor.id)}
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

export default DoctorList;
