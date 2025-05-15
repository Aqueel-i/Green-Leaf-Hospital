import React, { useEffect, useState } from "react";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentService";
import AppointmentForm from "../components/Appointments/AppointmentForm";

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAppointments = () => {
    setLoading(true);
    setError(null);
    getAppointments()
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load appointments.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCreate = (data) => {
    setError(null);
    createAppointment(data)
      .then(() => {
        fetchAppointments();
        setShowForm(false);
      })
      .catch((err) => setError(err.message || "Failed to create appointment."));
  };

  const handleUpdate = (data) => {
    setError(null);
    updateAppointment(editing.id, data)
      .then(() => {
        fetchAppointments();
        setEditing(null);
        setShowForm(false);
      })
      .catch((err) => setError(err.message || "Failed to update appointment."));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setError(null);
      deleteAppointment(id)
        .then(() => fetchAppointments())
        .catch(() => setError("Failed to delete appointment."));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">Appointments</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
          {error}
        </div>
      )}

      {!showForm && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
              setError(null);
            }}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded shadow-md transition"
          >
            Book New Appointment
          </button>
        </div>
      )}

      {showForm && (
        <AppointmentForm
          onSubmit={editing ? handleUpdate : handleCreate}
          initialData={editing || {}}
          onCancel={() => {
            setEditing(null);
            setShowForm(false);
            setError(null);
          }}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading appointments...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="border border-teal-700 px-4 py-3 text-left">Doctor</th>
                <th className="border border-teal-700 px-4 py-3 text-left">Patient</th>
                <th className="border border-teal-700 px-4 py-3 text-left">Date</th>
                <th className="border border-teal-700 px-4 py-3 text-left">Time</th>
                <th className="border border-teal-700 px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((appt, idx) => (
                  <tr
                    key={appt.id}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border px-4 py-2">{appt.doctor_name || appt.doctor_id}</td>
                    <td className="border px-4 py-2">{appt.patient_name}</td>
                    <td className="border px-4 py-2">{appt.date}</td>
                    <td className="border px-4 py-2">{appt.time}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => {
                          setEditing(appt);
                          setShowForm(true);
                          setError(null);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                        aria-label={`Edit appointment with ${appt.patient_name}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(appt.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                        aria-label={`Delete appointment with ${appt.patient_name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
