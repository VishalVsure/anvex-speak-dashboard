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
      style={buttonStyle}
      title="Download Sample Excel Document" // Tooltip text
    >
      <FontAwesomeIcon icon={faFileExcel} style={iconStyle} />
    </button>
  );
};

const buttonStyle = {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
};

const iconStyle = {
  color: "#217346", // Excel green
  fontSize: "24px",
};

export default DownloadExcel;
