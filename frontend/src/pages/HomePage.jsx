import React from "react";
import { motion } from "framer-motion";
import { FaUserMd, FaUserInjured, FaCalendarCheck, FaStethoscope } from "react-icons/fa";

const floatingVariants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-200 flex items-center justify-center p-6 overflow-hidden">

      {/* Animated background circles */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-teal-400 opacity-20"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute top-1/2 right-20 w-56 h-56 rounded-full bg-blue-400 opacity-15"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 2, duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-1/3 w-32 h-32 rounded-full bg-orange-300 opacity-20"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 1, duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="w-full max-w-5xl p-8 bg-white rounded-3xl shadow-xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">
          Welcome to <span className="text-teal-600">Green Leaf Hospital</span>
        </h1>
        <p className="text-center text-lg text-gray-600 max-w-xl mx-auto mb-12">
          Manage doctors, patients, appointments, and more — all in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <NavCard
            href="/doctors"
            Icon={FaUserMd}
            title="Doctors"
            description="View and manage the doctors in the hospital."
            bgColor="bg-teal-600"
          />
          <NavCard
            href="/patients"
            Icon={FaUserInjured}
            title="Patients"
            description="Track patient records and information."
            bgColor="bg-blue-600"
          />
          <NavCard
            href="/channeling"
            Icon={FaStethoscope}
            title="Channelings"
            description="Manage channeling schedules and details."
            bgColor="bg-orange-600"
          />
          <NavCard
            href="/appointments"
            Icon={FaCalendarCheck}
            title="Appointments"
            description="Book and view appointment schedules."
            bgColor="bg-green-600"
          />
        </div>
      </motion.div>
    </div>
  );
};

const NavCard = ({ href, Icon, title, description, bgColor }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
    whileTap={{ scale: 0.95 }}
    className={`flex flex-col p-6 rounded-2xl shadow-md cursor-pointer transition-shadow duration-300 ${bgColor} text-white`}
  >
    <motion.div
      whileHover={{ y: -5 }}
      className="text-5xl mb-4"
    >
      <Icon />
    </motion.div>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-90">{description}</p>
  </motion.a>
);

export default HomePage;
