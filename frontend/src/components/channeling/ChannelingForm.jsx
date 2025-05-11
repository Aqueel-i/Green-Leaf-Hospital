// src/components/channeling/ChannelingForm.jsx
import React, { useState } from "react";

const ChannelingForm = ({ doctors, loadAppointments }) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Logic to handle form submission
    const newAppointment = {
      doctor: selectedDoctor,
      patient: patientName,
      date: appointmentDate,
    };

    // You would typically send this data to the backend here to create a new appointment
    console.log("Appointment created:", newAppointment);

    // Reload the appointments
    loadAppointments();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="doctor" className="text-lg font-semibold">Select Doctor</label>
        <select
          id="doctor"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Select a Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="patientName" className="text-lg font-semibold">Patient Name</label>
        <input
          type="text"
          id="patientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="appointmentDate" className="text-lg font-semibold">Appointment Date</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-teal-600 text-white py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default ChannelingForm;
