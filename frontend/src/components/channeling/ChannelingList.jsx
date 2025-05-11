// src/components/channeling/ChannelingList.jsx
import React from "react";

const ChannelingList = ({ appointments }) => {
  return (
    <div className="mt-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 text-left">Doctor</th>
            <th className="p-2 text-left">Patient</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-t">
              <td className="p-2">{appointment.doctor}</td>
              <td className="p-2">{appointment.patient}</td>
              <td className="p-2">{appointment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChannelingList;
