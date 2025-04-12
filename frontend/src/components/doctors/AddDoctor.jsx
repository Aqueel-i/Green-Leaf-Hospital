import React, { useState } from 'react';
import { addDoctor } from '../../services/doctorService';

const AddDoctor = () => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDoctor = { name, specialization };
    try {
      const addedDoctor = await addDoctor(newDoctor);
      alert('Doctor added successfully');
      setName('');
      setSpecialization('');
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Error adding doctor');
    }
  };

  return (
    <div>
      <h1>Add Doctor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
        />
        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctor;
