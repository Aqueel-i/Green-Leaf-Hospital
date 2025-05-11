import React, { useState, useEffect } from "react";

const PatientForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ name: "", age: "", gender: "", contact: "", address: "" });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", age: "", gender: "", contact: "", address: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="w-full p-2 border rounded" required />
      <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border rounded" required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" className="w-full p-2 border rounded" />
      <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {initialData ? "Update Patient" : "Add Patient"}
      </button>
    </form>
  );
};

export default PatientForm;
