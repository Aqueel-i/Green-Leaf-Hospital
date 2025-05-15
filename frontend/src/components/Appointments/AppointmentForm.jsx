import React, { useState, useEffect } from "react";
import { getDoctors } from "../../services/doctorService";

const AppointmentForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(initialData.doctor_id || "");
  const [patientName, setPatientName] = useState(initialData.patient_name || "");
  const [date, setDate] = useState(initialData.date || "");
  const [time, setTime] = useState(initialData.time || "");
  const [error, setError] = useState(null);

  useEffect(() => {
    getDoctors()
      .then(setDoctors)
      .catch(() => setDoctors([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!doctorId || !patientName || !date || !time) {
      setError("Please fill all fields.");
      return;
    }
    setError(null);
    onSubmit({ doctor_id: doctorId, patient_name: patientName, date, time });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded shadow-md max-w-md mx-auto"
      aria-label="Appointment Form"
    >
      {error && (
        <p className="text-red-600 text-center font-medium">{error}</p>
      )}

      <label className="block">
        <span className="text-gray-700 font-semibold mb-1 block">Doctor:</span>
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Select a doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700 font-semibold mb-1 block">Patient Name:</span>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter patient name"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-semibold mb-1 block">Date:</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-semibold mb-1 block">Time:</span>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </label>

      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded transition"
        >
          Submit
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AppointmentForm;
