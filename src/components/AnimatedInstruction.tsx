"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedInstructions() {
  const [currentStep, setCurrentStep] = useState<number[]>([]);

  const instructions = [
    "Upload the list of Users to call in the specified format using Excel file in Upload List of calls tab.",
    "You can view the sample Excel format for Users list by clicking on the download Sample document button.",
    "Check the the list of users and confirm before uploading the file.",
    "Once verified, upload the file using the Upload button.",
    "Once File is uploaded, click on the Start Call button to start the calls.",
    "You will see the Details of the calls in the Call Records tab as it gets updated.",
    "You can also view the Call details by clicking on the View Details button.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev.length < instructions.length) {
          return [...prev, prev.length];
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 500); // Change step every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center h-full bg-gray-100 p-4">
      <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Usage Instructions
          </h2>
          <div className="space-y-4">
            <AnimatePresence>
              {currentStep.map((stepIndex) => (
                <motion.div
                  key={stepIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <p className="text-lg">
                    <span className="font-bold">Step {stepIndex + 1}:</span>{" "}
                    {instructions[stepIndex]}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
