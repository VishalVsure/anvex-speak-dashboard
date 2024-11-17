"use client";
// @ts-ignore
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, Pause } from "lucide-react";
import data from "@/assets/RecordsData";

interface CallDetails {
  name: string;
  number: string;
  call_time: string;
  duration: string;
  transcript: string;
  recording: string;
  overall_response: string;
}

interface DialogueEntry {
  speaker: string;
  text: string;
}

function formatTranscript(transcript: string): DialogueEntry[] {
  const lines = transcript.split("\n");
  const dialogue: DialogueEntry[] = [];
  let currentSpeaker = "";
  let currentText = "";

  for (const line of lines) {
    if (line.trim() === "AI" || line.trim() === "User") {
      if (currentSpeaker && currentText) {
        dialogue.push({ speaker: currentSpeaker, text: currentText.trim() });
      }
      currentSpeaker = line.trim();
      currentText = "";
    } else {
      currentText += " " + line.trim();
    }
  }

  if (currentSpeaker && currentText) {
    dialogue.push({ speaker: currentSpeaker, text: currentText.trim() });
  }

  return dialogue;
}

function AudioPlayer({ src, isOpen }: { src: string; isOpen: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(src));

  useEffect(() => {
    if (!isOpen) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isOpen, audio]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Button onClick={togglePlayPause} variant="outline" size="icon">
      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </Button>
  );
}

export default function Component() {
  const [selectedCall, setSelectedCall] = useState<CallDetails | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [formattedTranscript, setFormattedTranscript] = useState<
    DialogueEntry[]
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchTranscript = async (url: string) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      setTranscript(text);
      setFormattedTranscript(formatTranscript(text));
      console.log(text);
      console.log(transcript);
    } catch (error) {
      console.error("Error fetching transcript:", error);
      setTranscript("Failed to load transcript");
      setFormattedTranscript([]);
    }
  };

  return (
    <div className="container mx-auto">
      <p className="text-3xl font-bold pb-6">Call Records of Akila</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Call Time</TableHead>
            <TableHead>Duration</TableHead>
            {/* <TableHead>Response</TableHead> */}
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((call, index) => (
            <TableRow key={index}>
              <TableCell>{call.name}</TableCell>
              <TableCell>{call.number}</TableCell>
              <TableCell>{call.call_time}</TableCell>
              <TableCell>{call.duration}</TableCell>
              {/* <TableCell>
                <span
                  className={`font-semibold ${
                    call.overall_response === "Positive"
                      ? "text-green-400"
                      : call.overall_response === "Neutral"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {call.overall_response}
                </span>
              </TableCell> */}
              <TableCell>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setSelectedCall(call);
                        fetchTranscript(call.transcript);
                        setIsDialogOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="md:max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Call Details
                      </DialogTitle>
                    </DialogHeader>
                    {selectedCall && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                        <div>
                          <strong>Name:</strong> {selectedCall.name}
                        </div>
                        <div>
                          <strong>Number:</strong> {selectedCall.number}
                        </div>
                        <div>
                          <strong>Call Time:</strong> {selectedCall.call_time}
                        </div>
                        <div>
                          <strong>Duration:</strong> {selectedCall.duration}
                        </div>
                        {/* <div>
                          <strong>Response:</strong>{" "}
                          {selectedCall.overall_response}
                        </div> */}
                        <div className=""></div>
                        <div className="col-span-3">
                          <strong>Transcript: </strong>
                          <AudioPlayer
                            src={selectedCall.recording}
                            isOpen={isDialogOpen}
                          />
                          <div className="max-h-80 overflow-y-auto mt-2 p-2 border rounded">
                            <Table>
                              <TableBody>
                                {formattedTranscript.map((entry, index) => (
                                  <TableRow
                                    key={index}
                                    className={`${
                                      index % 2 === 0 ? "bg-gray-100" : ""
                                    }`}
                                  >
                                    <TableCell className="font-medium">
                                      {entry.speaker}
                                    </TableCell>
                                    <TableCell>{entry.text}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
