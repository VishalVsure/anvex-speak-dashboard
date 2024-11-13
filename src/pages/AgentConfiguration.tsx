"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PhoneCall, PhoneOutgoing, Clock, Calendar, User } from "lucide-react";
import DashboardLayout from "@/layout/DashboardLayout";

// Sample agent data
const agents = [
  { id: "agent1", name: "Customer Support Agent", type: "incoming" },
  { id: "agent2", name: "Sales Outreach Agent", type: "outgoing" },
  { id: "agent3", name: "Appointment Scheduler", type: "outgoing" },
  { id: "agent4", name: "Technical Support Agent", type: "incoming" },
];

export default function AgentCallConfiguration() {
  const [selectedAgent, setSelectedAgent] = useState("");
  const [callType, setCallType] = useState<"incoming" | "outgoing">("incoming");
  const [callsPerDay, setCallsPerDay] = useState(10);
  const [gapBetweenCalls, setGapBetweenCalls] = useState(5);
  const [workingHoursStart, setWorkingHoursStart] = useState("09:00");
  const [workingHoursEnd, setWorkingHoursEnd] = useState("17:00");
  const [workingDays, setWorkingDays] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]); // 1-7 representing Monday-Sunday
  const [retryFailedCalls, setRetryFailedCalls] = useState(true);
  const [maxRetries, setMaxRetries] = useState(3);

  const handleAgentChange = (agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      setSelectedAgent(agentId);
      setCallType(agent.type as "incoming" | "outgoing");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const configuration = {
      agentId: selectedAgent,
      callType,
      ...(callType === "outgoing" && {
        callsPerDay,
        gapBetweenCalls,
        workingHoursStart,
        workingHoursEnd,
        workingDays,
        retryFailedCalls,
        maxRetries,
      }),
    };
    console.log("Agent Call Configuration:", configuration);
    alert("Agent call configuration saved successfully!");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background text-foreground">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            Configure Agent Call Handling
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Select Agent</h2>
              <Select value={selectedAgent} onValueChange={handleAgentChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose an agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>{agent.name}</span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({agent.type === "incoming" ? "Incoming" : "Outgoing"}
                          )
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>

            {selectedAgent && (
              <Card>
                <CardHeader>
                  <CardTitle>Call Type</CardTitle>
                  <CardDescription>
                    This agent is configured for{" "}
                    {callType === "incoming" ? "incoming" : "outgoing"} calls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={callType}
                    onValueChange={(value: "incoming" | "outgoing") =>
                      setCallType(value)
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="incoming"
                        id="incoming"
                        disabled={callType !== "incoming"}
                      />
                      <Label
                        htmlFor="incoming"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>Incoming Calls</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="outgoing"
                        id="outgoing"
                        disabled={callType !== "outgoing"}
                      />
                      <Label
                        htmlFor="outgoing"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <PhoneOutgoing className="w-4 h-4" />
                        <span>Outgoing Calls</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {selectedAgent && callType === "outgoing" && (
              <>
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Call Schedule</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="calls-per-day">Calls per day</Label>
                      <Slider
                        id="calls-per-day"
                        min={1}
                        max={100}
                        step={1}
                        value={[callsPerDay]}
                        onValueChange={(value) => setCallsPerDay(value[0])}
                        className="mt-2"
                      />
                      <span className="text-sm text-muted-foreground">
                        {callsPerDay} calls
                      </span>
                    </div>
                    <div>
                      <Label htmlFor="gap-between-calls">
                        Gap between calls (minutes)
                      </Label>
                      <Slider
                        id="gap-between-calls"
                        min={1}
                        max={60}
                        step={1}
                        value={[gapBetweenCalls]}
                        onValueChange={(value) => setGapBetweenCalls(value[0])}
                        className="mt-2"
                      />
                      <span className="text-sm text-muted-foreground">
                        {gapBetweenCalls} minutes
                      </span>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Working Hours</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="working-hours-start">Start Time</Label>
                      <div className="flex items-center mt-2">
                        <Clock className="w-4 h-4 mr-2" />
                        <Input
                          id="working-hours-start"
                          type="time"
                          value={workingHoursStart}
                          onChange={(e) => setWorkingHoursStart(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="working-hours-end">End Time</Label>
                      <div className="flex items-center mt-2">
                        <Clock className="w-4 h-4 mr-2" />
                        <Input
                          id="working-hours-end"
                          type="time"
                          value={workingHoursEnd}
                          onChange={(e) => setWorkingHoursEnd(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Working Days</h2>
                  <div className="flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day, index) => (
                        <Button
                          key={day}
                          type="button"
                          variant={
                            workingDays.includes((index + 1).toString())
                              ? "default"
                              : "outline"
                          }
                          onClick={() => {
                            const dayNumber = (index + 1).toString();
                            setWorkingDays(
                              workingDays.includes(dayNumber)
                                ? workingDays.filter((d) => d !== dayNumber)
                                : [...workingDays, dayNumber]
                            );
                          }}
                          className="w-14"
                        >
                          {day}
                        </Button>
                      )
                    )}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    Call Retry Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="retry-failed-calls"
                        checked={retryFailedCalls}
                        onCheckedChange={setRetryFailedCalls}
                      />
                      <Label htmlFor="retry-failed-calls">
                        Retry failed calls
                      </Label>
                    </div>
                    {retryFailedCalls && (
                      <div>
                        <Label htmlFor="max-retries">Maximum retries</Label>
                        <Select
                          value={maxRetries.toString()}
                          onValueChange={(value) =>
                            setMaxRetries(parseInt(value))
                          }
                        >
                          <SelectTrigger
                            id="max-retries"
                            className="w-full mt-2"
                          >
                            <SelectValue placeholder="Select max retries" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((value) => (
                              <SelectItem key={value} value={value.toString()}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}

            <Button type="submit" className="w-full" disabled={!selectedAgent}>
              Save Agent Configuration
            </Button>
          </form>
        </main>
      </div>
    </DashboardLayout>
  );
}
