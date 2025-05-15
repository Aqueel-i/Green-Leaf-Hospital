import React, { useState, useEffect } from "react";
import { getDoctors } from "../services/doctorService";
import ChannelingForm from "../components/channeling/ChannelingForm";
import ChannelingList from "../components/channeling/ChannelingList";

const ChannelingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadDoctors();
    loadAppointments();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (err) {
      console.error("Error loading doctors:", err);
    }
  };

  const loadAppointments = async () => {
    setAppointments([
      { id: 1, doctor: "Dr. John", patient: "Alice", date: "2025-05-15" },
      { id: 2, doctor: "Dr. Smith", patient: "Bob", date: "2025-05-16" },
    ]);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10 bg-gray-50 rounded-lg shadow-md">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Channeling Appointments
        </h2>
        <p className="mt-1 text-gray-600 max-w-xl">
          Schedule and manage your channeling appointments with ease.
        </p>
      </header>

      {/* Channeling Form Component */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <ChannelingForm doctors={doctors} loadAppointments={loadAppointments} />
      </section>

      <hr className="border-gray-300" />

      {/* List of existing appointments */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Upcoming Appointments
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ChannelingList appointments={appointments} />
        </div>
      </section>
    </div>
  );
};

export default ChannelingPage;
