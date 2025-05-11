import React from "react";

const PatientList = ({ patients, onEdit, onDelete }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        patients.map((patient) => (
          <div key={patient.id} className="border p-4 rounded shadow bg-white">
            <h3 className="text-xl font-semibold">{patient.name}</h3>
            <p>Age: {patient.age}</p>
            <p>Gender: {patient.gender}</p>
            <p>Contact: {patient.contact}</p>
            <p>Address: {patient.address}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => onEdit(patient)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(patient.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientList;
