import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  // Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/layout/DashboardLayout";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

interface reqBody {
  range: string; // Specify the range (e.g., "Sheet1!A1:B1")
  values?: string[][];
}

export default function ExcelUploader() {
  const [excelData, setExcelData] = useState<any[][]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const savedToggleState = localStorage.getItem("toggle");
  //   if (savedToggleState !== null) {
  //     setChecked(savedToggleState === "true");
  //   }
  // }, []);

  const handleToggle = async (): Promise<void> => {
    setChecked(true);
    try {
      const response = await axios.get(
        "https://hook.eu2.make.com/dvzwgyc8gjl32gtnrt7isxtq2wqnpij0"
      );

      if (response.status === 200) {
        // localStorage.setItem("toggle", checked.toString());
        console.log("Webhook triggered successfully");
      } else {
        console.error("Failed to trigger webhook");
      }
    } catch (error) {
      console.error("Error triggering webhook:", error);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("Please select an excel file.");
      return;
    }

    setFileName(file.name);
    setLoading(true);
    setError(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as any[][];
      setExcelData(jsonData);
      // console.log(excelData)
    } catch (err) {
      setError(
        "Error parsing Excel file. Please make sure it's a valid Excel document."
      );
      toast.dismiss();
      toast.error("Error parsing Excel file.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     console.log("Selected file:", file);
  //     // Add your logic to handle the file (e.g., upload it)
  //   }
  // };

  // Trigger the hidden file input when the custom button is clicked
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    console.log(excelData);

    try {
      //Delete Previously entered Request
      const requestBody: reqBody = {
        range: "Akila Final Call List!A2:Z",
      };
      toast.loading("Uploading Users List...");

      const response = await axios.delete(
        "https://anvex-akila-demo.onrender.com/api/sheets/delete",
        { data: requestBody }
      );
      if (response.status === 200) {
        // Update Sheets with new records
        const requestBody: reqBody = {
          range: "Akila Final Call List!A2",
          values: excelData.slice(1),
        };
        toast.loading("Uploading Users List...");
        try {
          const response = await axios.put(
            "https://anvex-akila-demo.onrender.com/api/sheets/update",
            requestBody
          );
          console.log(response);
          setSubmitted(true);
          toast.dismiss();
          toast.success(`Successfully uploaded ${excelData.length - 1} users.`);
        } catch (error) {
          console.error("Error adding rows:", error);
          toast.dismiss();
          toast.error("Error adding Users.");
        }
      }
    } catch (error) {
      console.error("Error deletings rows:", error);
    }
  };
  return (
    <DashboardLayout>
      <div className="">
        {/* <Card className="w-full"> */}
        <CardHeader className="space-y-0 p-0 px-6">
          <CardTitle className="flex items-center justify-between text-2xl pt-1 pb-2">
            <p>File Uploader</p>

            {/* <Switch /> */}
          </CardTitle>
          <CardDescription className="pb-2">
            Select a excel file to make the calls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center h-full space-x-4 mb-4">
            <Button
              type="button"
              onClick={triggerFileInput}
              // className="px-4 py- bg-black text-white rounded"
            >
              Choose File
            </Button>

            <input
              type="file"
              accept=".xlsx, .xls"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {fileName && !error && <p className="mb-4">Previewing {fileName}</p>}

          {excelData.length > 0 && (
            <div className="h-3/4 overflow-x-auto">
              <div className="max-h-[500px] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-white z-10">
                    <TableRow>
                      {excelData[0].map((header, index) => (
                        <TableHead
                          key={index}
                          className="px-4 py-2 border-b text-left font-medium"
                        >
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {excelData.slice(1).map((row, rowIndex) => (
                      <TableRow key={rowIndex} className="hover:bg-gray-100">
                        {row.map((cell, cellIndex) => (
                          <TableCell
                            key={cellIndex}
                            className="px-4 py-2 border-b"
                          >
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <div className="flex items-center justify-center pt-2">
            {excelData.length > 0 && !submitted && (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
              </Button>
            )}
          </div>
          {submitted && (
            <div className="flex items-center justify-center pt-1">
              {/* Button toggles checked state */}
              {!checked ? (
                <Button onClick={handleToggle}>
                  {checked ? "Stop Calls" : "Start Calls"}
                </Button>
              ) : (
                <>Calls in progress</>
              )}
            </div>
          )}
        </CardContent>
        {/* </Card> */}
        <Toaster position="bottom-center" />
      </div>
    </DashboardLayout>
  );
}
