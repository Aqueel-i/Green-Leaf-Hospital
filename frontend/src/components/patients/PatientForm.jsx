import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSave } from "react-icons/fa";

const PatientForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setAge(initialData.age);
      setGender(initialData.gender);
      setEmail(initialData.email);
    } else {
      setName("");
      setAge("");
      setGender("Male");
      setEmail("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age, gender, email });
    setName("");
    setAge("");
    setGender("Male");
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
          id="name"
          type="text"
          placeholder="John Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="age" className="block font-semibold text-gray-700 mb-1">
          Age
        </label>
        <input
          id="age"
          type="number"
          min="0"
          placeholder="30"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block font-semibold text-gray-700 mb-1">
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="email" className="block font-semibold text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="patient@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <motion.button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSave />
        {initialData ? "Update Patient" : "Add Patient"}
      </motion.button>
    </motion.form>
  );
};

export default PatientForm;
