import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

 function Welcome() {

    const navigate = useNavigate();

   function gotoMainPage() {
        navigate('/layout');
    }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 overflow-hidden text-white">
      
      {/* Animated Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1.2 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-purple-500 rounded-full blur-[180px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1.2 }}
        transition={{ duration: 6, delay: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[180px]"
      />

      {/* Main Content */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 text-center max-w-2xl"
      >
        <h1 className="text-5xl font-extrabold mb-4">🚀 Welcome to Crypto Tracker</h1>
        <p className="text-lg text-gray-200 mb-8">
          Your one-stop platform to explore crypto insights, stay updated with 
          the latest trends, and learn about blockchain technology.
        </p>

       <motion.button onClick={gotoMainPage}
       whileHover={{
       scale: 1.05,
       rotate: [-1, 1, -1, 0], // subtle shake like a wave
       boxShadow: "0px 0px 25px rgba(99,102,241,0.7)",
       }}
       whileTap={{ scale: 0.95 }}
       transition={{
        type: "tween",
        stiffness: 300,
    damping: 15,
    duration: 0.4,
  }}
  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 
             rounded-2xl font-semibold shadow-lg text-white 
             text-2xl tracking-wide hover:from-indigo-700 hover:to-purple-700 hover:cursor-pointer "
>
           🚀 Welcome to the Crypto World 
       </motion.button>
        </motion.div>

    
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-lg"
        >
          <h3 className="text-xl font-semibold">📊 Learn Crypto Basics</h3>
          <p className="text-gray-200 text-sm mt-2">
            Get started with easy guides and resources to understand cryptocurrency and blockchain.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-lg"
        >
          <h3 className="text-xl font-semibold">🔒 Secure Platform</h3>
          <p className="text-gray-200 text-sm mt-2">
            Your data and learning journey remain private and safe with modern encryption.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-lg"
        >
          <h3 className="text-xl font-semibold">🌎 Global Community</h3>
          <p className="text-gray-200 text-sm mt-2">
            Connect with crypto enthusiasts, share insights, and grow together in the blockchain space.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
export default Welcome;