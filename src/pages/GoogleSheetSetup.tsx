import { useState } from 'react'
import * as XLSX from 'xlsx'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from '@/layout/DashboardLayout'
import axios from 'axios'

interface reqBody {
  range: string; // Specify the range (e.g., "Sheet1!A1:B1")
  values: string[][];
}
export default function ExcelUploader() {
  const [excelData, setExcelData] = useState<any[][]>([])
  const [fileName, setFileName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setLoading(true)
    setError(null)

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
      setExcelData(jsonData)
      // console.log(excelData)
    } catch (err) {
      setError('Error parsing Excel file. Please make sure it\'s a valid Excel document.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async() => {
    console.log(excelData);
    const requestBody: reqBody = {
      range: 'Akila Final Call List!A2',
      values: excelData.slice(1)
    } 

    try {
      const response = await axios.put('https://anvex-akila-demo.onrender.com/api/sheets/update',requestBody)
      console.log(response)
    } catch (error) {
      console.error("Error adding rows:", error);
    }

  }
  return (
    <DashboardLayout>
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Excel File Uploader</CardTitle>
          <CardDescription>Upload an Excel file to parse its contents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="flex-grow"
            />
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          {fileName && !error && (
            <p className="mb-4">Uploaded file: {fileName}</p>
          )}

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
      </Card>
    </div>
    </DashboardLayout>
  )
}