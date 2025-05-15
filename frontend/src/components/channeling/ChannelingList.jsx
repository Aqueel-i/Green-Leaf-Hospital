import React from "react";

const ChannelingList = ({ appointments }) => {
  if (!appointments.length) {
    return <p className="mt-4 text-center text-gray-500">No appointments found.</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto border rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-teal-600">
          <tr>
            <th className="px-4 py-3 text-left text-white font-semibold">Doctor</th>
            <th className="px-4 py-3 text-left text-white font-semibold">Patient</th>
            <th className="px-4 py-3 text-left text-white font-semibold">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {appointments.map((appointment, idx) => (
            <tr
              key={appointment.id}
              className={idx % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-teal-100 cursor-pointer transition"}
            >
              <td className="px-4 py-3">{appointment.doctor}</td>
              <td className="px-4 py-3">{appointment.patient}</td>
              <td className="px-4 py-3">{appointment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChannelingList;
