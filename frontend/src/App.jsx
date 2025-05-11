import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DoctorPage from './pages/DoctorPage';
import PatientPage from './pages/PatientPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Route for doctors page */}
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/patients" element={<PatientPage />} />
      </Routes>
    </Router>
  );
}

export default App;
