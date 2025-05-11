// src/pages/HomePage.jsx
import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
      <div className="w-full max-w-4xl p-6 sm:p-8 lg:p-10 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to the Hospital Management System
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Use the navigation to explore doctors, patients, and other sections of the system.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/doctors"
            className="inline-block bg-teal-600 text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-teal-700 transition-all duration-300"
          >
            View Doctors
          </a>
          <a
            href="/patients"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-300"
          >
            View Patients
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
