// src/components/doctors/DoctorForm.jsx
import React, { useEffect, useState } from "react";

const DoctorForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    contact: "",
    email: "",
  });

  // Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ name: "", specialization: "", contact: "", email: "" });
    }
  }, [initialData]);

  // Update form state on input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form); // Either add or update
    setForm({ name: "", specialization: "", contact: "", email: "" }); // Reset form after submit
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="specialization"
        value={form.specialization}
        onChange={handleChange}
        placeholder="Specialization"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="contact"
        value={form.contact}
        onChange={handleChange}
        placeholder="Contact"
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {initialData ? "Update Doctor" : "Add Doctor"}
      </button>
    </form>
  );
};

export default DoctorForm;
