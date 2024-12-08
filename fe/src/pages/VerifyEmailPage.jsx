import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const inputRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {};
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          {" "}
          Verify Your Email
        </h2>
        <p className="text-gray-400 mb-4 text-md text-center">
          Enter the verification code sent to your email address.
        </p>

        <form className="space-y-4">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                value={digit}
                maxLength={6}
                ref={(el) => (inputRef.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                type="text"
                className="w-12 h-12 text-center bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300 ease-in-out">
            Verify
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default VerifyEmailPage;
