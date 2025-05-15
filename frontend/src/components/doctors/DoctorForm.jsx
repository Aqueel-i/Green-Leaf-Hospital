import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSave } from "react-icons/fa";

const DoctorForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSpecialty(initialData.specialty);
      setEmail(initialData.email);
    } else {
      setName("");
      setSpecialty("");
      setEmail("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, specialty, email });
    setName("");
    setSpecialty("");
    setEmail("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label htmlFor="name" className="block font-semibold text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Dr. John Doe"
        />
      </div>

      <div>
        <label htmlFor="specialty" className="block font-semibold text-gray-700 mb-1">
          Specialty
        </label>
        <input
          type="text"
          id="specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Cardiology"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-semibold text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="doctor@example.com"
        />
      </div>

      <motion.button
        type="submit"
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSave />
        {initialData ? "Update Doctor" : "Add Doctor"}
      </motion.button>
    </motion.form>
  );
};

export default DoctorForm;
