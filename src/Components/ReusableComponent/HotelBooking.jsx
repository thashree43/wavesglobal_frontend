import React from "react";


const HotelBooking= () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 relative overflow-hidden">
      {/* Background clouds */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 50, opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-10 left-0 w-32 h-16 bg-white rounded-full shadow"
      ></motion.div>

      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: -50, opacity: 1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-20 right-0 w-40 h-20 bg-white rounded-full shadow"
      ></motion.div>

      {/* Couple */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className="flex flex-col items-center relative z-10"
      >
        <div className="flex items-center space-x-4">
          {/* Man */}
          <div className="w-12 h-24 bg-blue-500 rounded-md"></div>
          {/* Woman */}
          <div className="w-12 h-24 bg-pink-500 rounded-md"></div>
        </div>
        {/* Luggage */}
        <div className="flex space-x-2 mt-2">
          <div className="w-6 h-12 bg-gray-600 rounded"></div>
          <div className="w-8 h-16 bg-green-600 rounded"></div>
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className="ml-10 w-52 h-[400px] bg-blue-700 rounded-2xl p-4 text-white relative"
      >
        <div className="bg-white rounded-xl p-3 text-black text-center">
          <h2 className="text-lg font-bold">🏨 Hotel</h2>
          <p className="text-yellow-500">⭐⭐⭐⭐</p>
          <motion.button
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg shadow"
          >
            BOOK
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HotelBooking;
