import React, { useState } from 'react';
import { addDoctor } from '../../services/doctorService';
import { FaUserMd, FaSpinner } from 'react-icons/fa';

const AddDoctor = () => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    const newDoctor = { name, specialization };

    try {
      await addDoctor(newDoctor);
      setSuccessMsg('Doctor added successfully!');
      setName('');
      setSpecialization('');
    } catch (error) {
      console.error('Error adding doctor:', error);
      setErrorMsg('Failed to add doctor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaUserMd className="text-teal-600" /> Add Doctor
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-2 rounded-md font-semibold hover:bg-teal-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Adding...
            </>
          ) : (
            'Add Doctor'
          )}
        </button>
      </form>

      {successMsg && (
        <p className="text-green-600 font-semibold text-center">{successMsg}</p>
      )}
      {errorMsg && (
        <p className="text-red-600 font-semibold text-center">{errorMsg}</p>
      )}
    </div>
  );
};

export default AddDoctor;
