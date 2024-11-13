import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Play, Check } from "lucide-react";
import DashboardLayout from "@/layout/DashboardLayout";
import CustomVoiceSample from "@/components/CustomVoice";

// Simulated voice data
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

export default function VoiceSelection() {
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handlePlay = (voiceId: string) => {
    setIsPlaying(voiceId);
    setTimeout(() => setIsPlaying(null), 3000); // Simulate audio playback
  };

  const handleSubmit = () => {
    if (selectedVoice) {
      toast(
        `Voice "${
          voices.find((v) => v.id === selectedVoice)?.name
        }" selected for the bot!`
      );
    }
  };

  return (
    <DashboardLayout>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Voices we offer</CardTitle>
          <CardDescription>
            Listen to the voices we offer or create your own.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter>
          {/* <Button
            onClick={handleSubmit}
            disabled={!selectedVoice}
            className="w-full"
          >
            <Check className="w-4 h-4 mr-2" />
            Confirm Selection
          </Button> */}
          <Button onClick={() => setShowOverlay(true)} className="mt-2 w-full">
            Add Custom Voice
          </Button>
        </CardFooter>
      </Card>

      {/* Overlay for Custom Voice */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            {/* Close button in the top-right corner */}
            <Button
              onClick={() => setShowOverlay(false)}
              className="absolute top-0 right-0 rounded-full p-2"
              aria-label="Close"
            >
              X
            </Button>
            {/* CustomVoiceSample content */}
            <CustomVoiceSample />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
