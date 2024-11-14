"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import DashboardLayout from "@/layout/DashboardLayout";

export default function GoogleSheetSetup() {
  const [sheetUrl, setSheetUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sheetUrl) {
      setIsSubmitted(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background text-foreground">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Set Up Your Google Sheet</h1>

          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  1
                </span>
                Create a Blank Google Sheet
              </h2>
              <p>
                Start by creating a new Google Sheet that will be used for your
                project.
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  Go to{" "}
                  <a
                    href="https://sheets.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Sheets
                  </a>
                </li>
                <li>
                  Click on the &quot;Blank&quot; template to create a new sheet
                </li>
                <li>
                  Give your sheet a meaningful name by clicking on
                  &quot;Untitled spreadsheet&quot; at the top
                </li>
              </ol>
              <Button variant="outline" className="mt-2">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Google Sheets
              </Button>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  2
                </span>
                Share the Google Sheet
              </h2>
              <p>
                Next, you need to make your Google Sheet accessible to others.
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  Click on the &quot;Share&quot; button in the top right corner
                </li>
                <li>
                  In the &quot;Share with people and groups&quot; window, click
                  on &quot;Change to anyone with the link&quot;
                </li>
                <li>Ensure that the access is set to &quot;Editor&quot;</li>
                <li>Click on &quot;Copy link&quot; to get the shareable URL</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  3
                </span>
                Enter the Sheet URL
              </h2>
              <p>
                Finally, paste the copied Google Sheet URL in the input box
                below.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sheet-url">Google Sheet URL</Label>
                  <Input
                    id="sheet-url"
                    type="url"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">
                  Submit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </section>
          </div>

          {isSubmitted && (
            <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
              <CheckCircle2 className="w-6 h-6 mr-2" />
              <p>Great! Your Google Sheet has been successfully linked.</p>
            </div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}
