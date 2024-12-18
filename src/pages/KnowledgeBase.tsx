import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileUp, Check } from "lucide-react";
import DashboardLayout from "@/layout/DashboardLayout";

export default function KnowledgeBaseUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setUploadStatus("idle");
    } else {
      setFile(null);
      setUploadStatus("error");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("idle");

    // Simulating file upload process
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUploadStatus("success");
    } catch (error) {
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Upload Knowledge Base
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="pdf-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload PDF
            </label>
            <Input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>

          {file && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <FileUp size={16} />
              <span>{file.name}</span>
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="flex items-center space-x-2 text-sm text-red-600">
              <AlertCircle size={16} />
              <span>Please select a valid PDF file.</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={!file || isUploading}
            className="w-full bg-black"
          >
            {isUploading ? "Uploading..." : "Upload PDF"}
          </Button>

          {uploadStatus === "success" && (
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Check size={16} />
              <span>Upload successful!</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
