import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import * as XLSX from "xlsx";

interface CallDetails {
  name: string;
  number: string;
  call_time: string;
  call_duration: string;
  transcript: string;
  recording: string;
  overall_response: string;
  call_cost: string;
  call_sentiment: string;
  call_type: string;
}

export default function ExportToExcel({
  userData,
}: {
  userData: CallDetails[];
}) {
  const exportToExcel = () => {
    // Create a worksheet from JSON data
    const worksheet = XLSX.utils.json_to_sheet(userData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Call Details");

    // Export the workbook to a file
    XLSX.writeFile(workbook, "CallDetails.xlsx");
  };

  return (
    <button
      onClick={exportToExcel}
      title="Download Sample Excel Document" // Tooltip text
      className="flex px-4 py-2 shadow-md rounded-md border-2 m-0"
    >
      <span className="font-semibold pr-2">Export Call Logs</span>
      <FontAwesomeIcon icon={faFileExcel} style={iconStyle} />
    </button>
  );
}

const iconStyle = {
  color: "#217346", // Excel green
  fontSize: "24px",
};
