"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mic, CircleStopIcon as Stop, Play, Upload } from "lucide-react";

export default function CustomVoiceSample() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceName, setVoiceName] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioBlob) {
      audioRef.current = new Audio(URL.createObjectURL(audioBlob));
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () =>
          setIsPlaying(false)
        );
      }
    };
  }, [audioBlob]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!audioBlob || !voiceName) return;

    // Simulating file upload process
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, `${voiceName}.wav`);
      formData.append("name", voiceName);

      // Replace this with your actual API endpoint
      // await fetch('/api/upload-voice-sample', {
      //   method: 'POST',
      //   body: formData
      // })

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Voice sample "${voiceName}" uploaded successfully!`);
      setVoiceName("");
      setAudioBlob(null);
    } catch (error) {
      console.error("Error uploading voice sample:", error);
      alert("Failed to upload voice sample. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Add Your Own Voice Sample
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="voice-name">Voice Name</Label>
            <Input
              id="voice-name"
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
              placeholder="Enter a name for your voice"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Record Sample</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={isRecording ? "bg-red-500 hover:bg-red-600" : ""}
              >
                {isRecording ? (
                  <Stop className="w-4 h-4 mr-2" />
                ) : (
                  <Mic className="w-4 h-4 mr-2" />
                )}
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
              {audioBlob && (
                <Button
                  type="button"
                  onClick={isPlaying ? stopAudio : playAudio}
                  variant="outline"
                >
                  {isPlaying ? (
                    <Stop className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isPlaying ? "Stop" : "Play"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          disabled={!audioBlob || !voiceName}
          className="w-full"
          onClick={(e) => handleSubmit(e as any)}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Voice Sample
        </Button>
      </CardFooter>
    </Card>
  );
}
