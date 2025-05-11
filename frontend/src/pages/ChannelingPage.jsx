// src/pages/ChannelingPage.jsx
import React, { useState, useEffect } from "react";
import { getDoctors } from "../services/doctorService";  // Assume you have a service for fetching doctors
import ChannelingForm from "../components/channeling/ChannelingForm";  // Placeholder for your channeling form component
import ChannelingList from "../components/channeling/ChannelingList";  // Placeholder for the channeling list component

const ChannelingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadDoctors();
    loadAppointments();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await getDoctors();  // Fetch doctors using the service
      setDoctors(data);
    } catch (err) {
      console.error("Error loading doctors:", err);
    }
  };

  const loadAppointments = async () => {
    // Assuming you have an API or service to get appointments (channeling)
    // This should ideally come from the backend.
    // For now, it's just a placeholder.
    setAppointments([
      { id: 1, doctor: "Dr. John", patient: "Alice", date: "2025-05-15" },
      { id: 2, doctor: "Dr. Smith", patient: "Bob", date: "2025-05-16" },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Channeling Appointments</h2>
      
      {/* Channeling Form Component */}
      <ChannelingForm doctors={doctors} loadAppointments={loadAppointments} />

      <hr />

      {/* List of existing appointments */}
      <h3 className="text-xl font-semibold">Appointments</h3>
      <ChannelingList appointments={appointments} />
    </div>
  );
};

export default ChannelingPage;
