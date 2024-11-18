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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
// import data from "@/assets/RecordsData";

interface CallDetails {
  name: string;
  number: string;
  call_time: string;
  call_duration: string;
  transcript: string;
  recording: string;
  overall_response: string;
  call_cost: string;
  call_sentiment: string;
  call_type: string;
}

// interface DialogueEntry {
//   speaker: string;
//   text: string;
// }

// function formatTranscript(transcript: string): DialogueEntry[] {
//   const lines = transcript.split("\n");
//   const dialogue: DialogueEntry[] = [];
//   let currentSpeaker = "";
//   let currentText = "";

//   for (const line of lines) {
//     if (line.trim() === "AI" || line.trim() === "User") {
//       if (currentSpeaker && currentText) {
//         dialogue.push({ speaker: currentSpeaker, text: currentText.trim() });
//       }
//       currentSpeaker = line.trim();
//       currentText = "";
//     } else {
//       currentText += " " + line.trim();
//     }
//   }

//   if (currentSpeaker && currentText) {
//     dialogue.push({ speaker: currentSpeaker, text: currentText.trim() });
//   }

//   return dialogue;
// }

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

export default function Component({
  userData = [],
  refreshData,
}: {
  userData: CallDetails[];
  refreshData: () => void;
}) {
  const [selectedCall, setSelectedCall] = useState<CallDetails | null>(null);
  // const [transcript, setTranscript] = useState<string>("");
  // const [formattedTranscript, setFormattedTranscript] = useState<
  //   DialogueEntry[]
  // >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [loading, setLoading] = useState<boolean>(false);

  // const handleRefresh = async () => {
  //   setLoading(true);
  //   await refreshData(); // Call the parent-provided refresh function
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   // Auto-refresh every 30 seconds
  //   const interval = setInterval(() => {
  //     handleRefresh();
  //   }, 5000);

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  // const fetchTranscript = async (url: string) => {
  //   try {
  //     const response = await fetch(url);
  //     const text = await response.text();
  //     setTranscript(text);
  //     setFormattedTranscript(formatTranscript(text));
  //     console.log(text);
  //     console.log(transcript);
  //   } catch (error) {
  //     console.error("Error fetching transcript:", error);
  //     setTranscript("Failed to load transcript");
  //     setFormattedTranscript([]);
  //   }
  // };

  // Function to format the transcript with styles
  const formatTranscript = (transcript: string) => {
    return transcript.split(/(?=AI:|User:)/).map((line, index) => {
      const isAI = line.startsWith("AI:");
      const [label, ...messageParts] = line.split(":");
      const message = messageParts.join(":").trim();

      return (
        <div
          key={index}
          className={`flex items-start gap-2 mb-2 ${
            isAI ? "bg-gray-100 text-gray-800" : "bg-white text-black"
          } p-2 rounded-md`}
        >
          <strong
            className={`w-10 shrink-0 ${isAI ? "text-gray-800" : "text-black"}`}
          >
            {label}:
          </strong>
          <span>{message}</span>
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <p className="text-3xl font-bold pb-6">Call Logs (Akila)</p>
        <button
          onClick={refreshData}
          className={`text-2xl cursor-pointer pb-6`}
          title="Refresh Data"
        >
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Call Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Call Cost</TableHead>
            <TableHead>Call Sentiments</TableHead>
            {/* <TableHead>Response</TableHead> */}
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((call, index) => (
            <TableRow key={index}>
              <TableCell>{call.name}</TableCell>
              <TableCell>{call.number}</TableCell>
              <TableCell>{call.call_time}</TableCell>
              <TableCell>{call.call_duration}</TableCell>
              <TableCell>$ {call.call_cost}</TableCell>
              <TableCell>{call.call_sentiment}</TableCell>
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
                        // fetchTranscript(call.transcript);
                        setIsDialogOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="md:max-w-4xl h-3/4 overflow-auto">
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
                          <strong>Duration:</strong>{" "}
                          {selectedCall.call_duration}
                        </div>
                        <div>
                          <strong>Cost:</strong> {selectedCall.call_cost}
                        </div>
                        <div>
                          <strong>Sentiment:</strong>{" "}
                          {selectedCall.call_sentiment}
                        </div>
                        {/* <div>
                          <strong>Response:</strong>{" "}
                          {selectedCall.overall_response}
                        </div> */}
                        <div className=""></div>
                        <div className="col-span-3">
                          <div className="col-span-9 pb-3">
                            <strong>Recording: </strong>
                            <AudioPlayer
                              src={selectedCall.recording}
                              isOpen={isDialogOpen}
                            />
                          </div>

                          {/* <div className="max-h-80 overflow-y-auto mt-2 p-2 border rounded"> */}
                          {/* <Table>
                              <TableBody> */}
                          <strong>Transcript: </strong>
                          <div
                            className="transcript-container overflow-y-auto max-h-96 border rounded-md p-4 mt-[15px]
"
                          >
                            {formatTranscript(selectedCall.transcript)}
                          </div>
                          {/* {formattedTranscript.map((entry, index) => (
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
                                ))} */}
                          {/* </TableBody>
                            </Table> */}
                          {/* </div> */}
                          <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">
                              Overall Summary
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-justify">
                              {selectedCall.overall_response}
                            </p>
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
