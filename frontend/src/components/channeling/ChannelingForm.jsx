import React, { useState } from "react";

const ChannelingForm = ({ doctors, loadAppointments }) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!selectedDoctor || !patientName.trim() || !appointmentDate) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    const newAppointment = {
      doctor: selectedDoctor,
      patient: patientName.trim(),
      date: appointmentDate,
    };

    // TODO: Send this to backend to save appointment
    console.log("Appointment created:", newAppointment);

    // Clear form
    setSelectedDoctor("");
    setPatientName("");
    setAppointmentDate("");

    // Reload appointments
    loadAppointments();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="text-red-600 font-semibold text-center">{error}</p>
      )}

      <div className="flex flex-col">
        <label htmlFor="doctor" className="text-lg font-semibold mb-1">
          Select Doctor
        </label>
        <select
          id="doctor"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          required
        >
          <option value="" disabled>
            Select a Doctor
          </option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="patientName" className="text-lg font-semibold mb-1">
          Patient Name
        </label>
        <input
          type="text"
          id="patientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter patient name"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          required
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="appointmentDate"
          className="text-lg font-semibold mb-1"
        >
          Appointment Date
        </label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-teal-600 text-white font-semibold py-3 rounded-full hover:bg-teal-700 transition duration-300 shadow-md"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default ChannelingForm;
