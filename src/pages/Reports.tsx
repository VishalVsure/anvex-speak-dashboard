import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";

interface Campaign {
  name: string;
  totalCalls: number;
  successRate: string;
  avgDuration: string;
  status: "Active" | "Paused";
}

const campaigns: Campaign[] = [
  {
    name: "Q4 Sales Outreach",
    totalCalls: 450,
    successRate: "68%",
    avgDuration: "4m 12s",
    status: "Active",
  },
  {
    name: "Customer Feedback",
    totalCalls: 250,
    successRate: "82%",
    avgDuration: "3m 45s",
    status: "Paused",
  },
];

function StatsCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export function Reports() {
  return (
    <div className="w-full bg-gray-50/40 dark:bg-gray-900/40 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Manage your AI telecalling system
            </p>
          </div>
          <Button size="lg" className="gap-2">
            <Phone className="h-4 w-4" />
            New Campaign
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Calls"
            value="1,234"
            subtitle="Last 30 days"
          />
          <StatsCard
            title="Success Rate"
            value="75%"
            subtitle="+5% from last month"
          />
          <StatsCard
            title="Avg. Duration"
            value="3m 45s"
            subtitle="Per successful call"
          />
          <StatsCard
            title="Active Campaigns"
            value="8"
            subtitle="Currently running"
          />
        </div>

        {/* Campaign Performance */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Campaign Performance
          </h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead className="text-right">Total Calls</TableHead>
                  <TableHead className="text-right">Success Rate</TableHead>
                  <TableHead className="text-right">Avg. Duration</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.name}>
                    <TableCell className="font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {campaign.totalCalls}
                    </TableCell>
                    <TableCell className="text-right">
                      {campaign.successRate}
                    </TableCell>
                    <TableCell className="text-right">
                      {campaign.avgDuration}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          campaign.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
