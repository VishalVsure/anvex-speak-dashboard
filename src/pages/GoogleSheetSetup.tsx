import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/layout/DashboardLayout";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

interface reqBody {
  range: string; // Specify the range (e.g., "Sheet1!A1:B1")
  values: string[][];
}

export default function ExcelUploader() {
  const [excelData, setExcelData] = useState<any[][]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const savedToggleState = localStorage.getItem("toggle");
    if (savedToggleState !== null) {
      setChecked(savedToggleState === "true");
    }
  }, []);

  const handleToggle = async (checked: boolean): Promise<void> => {
    setChecked(checked);
    if (checked) {
      try {
        const response = await axios.get(
          "https://hook.eu2.make.com/dvzwgyc8gjl32gtnrt7isxtq2wqnpij0"
        );

        if (response.status === 200) {
          localStorage.setItem("toggle", checked.toString());
          console.log("Webhook triggered successfully");
        } else {
          console.error("Failed to trigger webhook");
        }
      } catch (error) {
        console.error("Error triggering webhook:", error);
      }
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

  const handleSubmit = async () => {
    console.log(excelData);
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
  };
  return (
    <DashboardLayout>
      <div className="">
        {/* <Card className="w-full"> */}
        <CardHeader className="space-y-0 p-0 px-6">
          <CardTitle className="flex items-center justify-between text-2xl pt-1 pb-2">
            <p>Excel File Uploader</p>
            {submitted && (
              <div className="flex items-center">
                <p className="font-normal px-2 text-md">Start Calls</p>
                <Switch checked={checked} onCheckedChange={handleToggle} />
              </div>
            )}
            {/* <Switch /> */}
          </CardTitle>
          <CardDescription className="pb-2">
            Upload an Excel file to parse its contents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center h-full space-x-4 mb-4">
            <Input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="flex-grow"
            />
            {excelData.length > 0 && !submitted && (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
              </Button>
            )}
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {fileName && !error && <p className="mb-4">Previewing {fileName}</p>}

          {excelData.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {excelData[0].map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {excelData.slice(1).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {/* </Card> */}
        <Toaster position="bottom-center" />
      </div>
    </DashboardLayout>
  );
}
