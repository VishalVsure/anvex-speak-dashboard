import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BatchCalling() {
  return (
    <div className="p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            batch-calling
          </h1>
          <p className="text-gray-500">Manage your AI telecalling system</p>
        </div>
        <Button className="bg-[#6366F1] hover:bg-[#5558DD]">
          New Campaign
        </Button>
      </div>

      <div className="space-y-8">
        {/* Campaign Setup Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Campaign Setup
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Campaign Name
              </label>
              <Input
                type="text"
                placeholder="Enter campaign name"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Target List
              </label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="text-gray-700">
                  Choose File
                </Button>
                <span className="text-gray-500 text-sm">No file chosen</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Schedule Start
              </label>
              <Input
                type="datetime-local"
                placeholder="mm/dd/yyyy --:-- --"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Call Limit
              </label>
              <Input
                type="number"
                placeholder="Calls per hour"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Active Campaigns Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Active Campaigns
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Q4 Sales Outreach</TableCell>
                <TableCell>45/100</TableCell>
                <TableCell>68%</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Active
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    className="text-red-600 hover:text-red-700 p-0"
                  >
                    Pause
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer Feedback</TableCell>
                <TableCell>12/50</TableCell>
                <TableCell>75%</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                    Paused
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    className="text-green-600 hover:text-green-700 p-0"
                  >
                    Resume
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
