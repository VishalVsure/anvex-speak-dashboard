"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DownloadExcel from "./ExcelSampleDocument";

export default function AnimatedInstructions() {
  const [currentStep, setCurrentStep] = useState<number[]>([]);

  const instructions = [
    "Upload the User List in the specified format using the Excel file on the 'Upload List of Calls' tab.",
    "View the sample format by clicking the Excel icon at the top right.",
    "Ensure your phone number is entered in international format (e.g., '+91123456789, no spaces).",
    "Review the user list preview and confirm its accuracy before uploading.",
    "After verification, click the Upload button to upload the file.",
    "Once the file is uploaded, click 'Start Call' to initiate calls.",
    "Track call details in the 'Call Records' tab as they update.",
    "You can also view call details by clicking the 'View Details' button.",
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
    <div className="w-full flex flex-col items-center justify-center h-full bg-gray-100">
      <div className="w-full h-full bg-white overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between pb-4">
            <p className="text-2xl font-bold mb-4 text-center">
              Usage Instructions
            </p>
            <div>
              <DownloadExcel />
            </div>
          </div>
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
