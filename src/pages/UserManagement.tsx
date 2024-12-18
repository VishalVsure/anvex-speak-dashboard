import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function UserManagement() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            user-management
          </h1>
          <p className="text-gray-500">Manage your AI telecalling system</p>
        </div>
        <Button className="bg-[#adaeea] hover:bg-[#5558DD]">
          New Campaign
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
          <Button className="bg-[#6366F1] hover:bg-[#5558DD]">Add User</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Smith</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell>Administrator</TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Active
                </Badge>
              </TableCell>
              <TableCell className="space-x-4">
                <Button
                  variant="link"
                  className="text-[#6366F1] hover:text-[#5558DD] p-0"
                >
                  Edit
                </Button>
                <Button
                  variant="link"
                  className="text-red-600 hover:text-red-700 p-0"
                >
                  Deactivate
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Doe</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Active
                </Badge>
              </TableCell>
              <TableCell className="space-x-4">
                <Button
                  variant="link"
                  className="text-[#6366F1] hover:text-[#5558DD] p-0"
                >
                  Edit
                </Button>
                <Button
                  variant="link"
                  className="text-red-600 hover:text-red-700 p-0"
                >
                  Deactivate
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Role Permissions
        </h2>

        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Administrator</h3>
          <p className="text-gray-500 mb-6">
            Full system access and management capabilities
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="manage-users" defaultChecked />
              <label
                htmlFor="manage-users"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Manage Users
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="manage-campaigns" defaultChecked />
              <label
                htmlFor="manage-campaigns"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Manage Campaigns
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="view-reports" defaultChecked />
              <label
                htmlFor="view-reports"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                View Reports
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="configure-system" defaultChecked />
              <label
                htmlFor="configure-system"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Configure System
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
