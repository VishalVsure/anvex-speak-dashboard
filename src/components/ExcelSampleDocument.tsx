import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const DownloadExcel = () => {
  const downloadExcel = () => {
    const sheetId = "116R6bHVDID7oSargF0lADS2hTAmdm5TO";
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={downloadExcel}
      title="Download Sample Excel Document" // Tooltip text
      className="flex px-4 py-2 shadow-md rounded-md border-2"
    >
      <span className="font-semibold pr-2">Download the Sample Excel</span>
      <FontAwesomeIcon icon={faFileExcel} style={iconStyle} />
    </button>
  );
};

const iconStyle = {
  color: "#217346", // Excel green
  fontSize: "24px",
};

export default DownloadExcel;
