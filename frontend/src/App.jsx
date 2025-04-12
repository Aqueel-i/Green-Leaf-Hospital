import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorPage from './pages/DoctorPage'; // Assuming you have this page
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Route for doctors page */}
        <Route path="/doctors" element={<DoctorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
