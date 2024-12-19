import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function CallLogs() {
  return (
    <div className="p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">call-logs</h1>
          <p className="text-gray-500">Manage your AI telecalling system</p>
        </div>
        <Button className="bg-[#6366F1] hover:bg-[#5558DD]">
          New Campaign
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Call History</h2>

        <div className="flex gap-4 mb-6">
          <Input placeholder="Search calls..." className="max-w-md" />
          <Select defaultValue="all-campaigns">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Campaigns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-campaigns">All Campaigns</SelectItem>
              <SelectItem value="q4-sales">Q4 Sales Outreach</SelectItem>
              <SelectItem value="customer-feedback">
                Customer Feedback
              </SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2024-01-20 14:30</TableCell>
              <TableCell>+1 (555) 123-4567</TableCell>
              <TableCell>Q4 Sales Outreach</TableCell>
              <TableCell>4m 32s</TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Completed
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="link"
                  className="text-[#6366F1] hover:text-[#5558DD] p-0"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2024-01-20 14:15</TableCell>
              <TableCell>+1 (555) 987-6543</TableCell>
              <TableCell>Customer Feedback</TableCell>
              <TableCell>0s</TableCell>
              <TableCell>
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                  Failed
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="link"
                  className="text-[#6366F1] hover:text-[#5558DD] p-0"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
