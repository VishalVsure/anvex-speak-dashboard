"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Check } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/layout/DashboardLayout";

// Sample data
const voices = [
  {
    id: "v1",
    name: "Sofia",
    description: "Friendly and warm female voice",
    audioUrl: "/sofia-sample.mp3",
  },
  {
    id: "v2",
    name: "Alex",
    description: "Professional male voice",
    audioUrl: "/alex-sample.mp3",
  },
  {
    id: "v3",
    name: "Emma",
    description: "Young and energetic female voice",
    audioUrl: "/emma-sample.mp3",
  },
  {
    id: "v4",
    name: "James",
    description: "Deep and authoritative male voice",
    audioUrl: "/james-sample.mp3",
  },
];

const knowledgeBases = [
  {
    id: "kb1",
    name: "General Knowledge",
    description: "Covers a wide range of topics",
  },
  {
    id: "kb2",
    name: "Technical Support",
    description: "IT and software troubleshooting information",
  },
  {
    id: "kb3",
    name: "Product Catalog",
    description: "Detailed information about our products",
  },
  {
    id: "kb4",
    name: "FAQ",
    description: "Frequently asked questions and answers",
  },
];

const sheetSources = [
  {
    id: "ss1",
    name: "Customer Data",
    url: "https://docs.google.com/spreadsheets/d/1abc.../",
  },
  {
    id: "ss2",
    name: "Inventory",
    url: "https://docs.google.com/spreadsheets/d/2def.../",
  },
  {
    id: "ss3",
    name: "Sales Records",
    url: "https://docs.google.com/spreadsheets/d/3ghi.../",
  },
  {
    id: "ss4",
    name: "Employee Directory",
    url: "https://docs.google.com/spreadsheets/d/4jkl.../",
  },
];

export default function AgentCreation() {
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState("");
  const [selectedSheetSource, setSelectedSheetSource] = useState("");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handlePlay = (voiceId: string) => {
    setIsPlaying(voiceId);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(null), 3000);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedVoice && selectedKnowledgeBase && selectedSheetSource) {
      toast.success("Agent saved successfully!");
    } else {
      toast.error("Please select all required options before saving.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create your agent</h1>

        <form onSubmit={handleSubmit} className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Select a Voice</h2>
            <RadioGroup
              value={selectedVoice}
              onValueChange={setSelectedVoice}
              className="space-y-4"
            >
              {voices.map((voice) => (
                <div
                  key={voice.id}
                  className="flex items-center space-x-2 space-y-0"
                >
                  <RadioGroupItem
                    value={voice.id}
                    id={voice.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={voice.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between w-full p-4 cursor-pointer rounded-lg border border-muted peer-checked:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium leading-none peer-checked:text-primary">
                        {voice.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {voice.description}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 sm:mt-0"
                      onClick={() => handlePlay(voice.id)}
                      disabled={isPlaying !== null}
                    >
                      {isPlaying === voice.id ? (
                        "Playing..."
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Select a Knowledge Base
            </h2>
            <Select
              value={selectedKnowledgeBase}
              onValueChange={setSelectedKnowledgeBase}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a knowledge base" />
              </SelectTrigger>
              <SelectContent>
                {knowledgeBases.map((kb) => (
                  <SelectItem key={kb.id} value={kb.id}>
                    <span className="font-medium">{kb.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      - {kb.description}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Select a Sheet Source
            </h2>
            <Select
              value={selectedSheetSource}
              onValueChange={setSelectedSheetSource}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a sheet source" />
              </SelectTrigger>
              <SelectContent>
                {sheetSources.map((ss) => (
                  <SelectItem key={ss.id} value={ss.id}>
                    <span className="font-medium">{ss.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      - {ss.url}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>

          <Button type="submit" className="w-full">
            <Check className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </form>
      </main>
    </div>
  );
}
