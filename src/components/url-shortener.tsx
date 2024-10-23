"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import getShortUrlId from "@/utils/shortenUrl";

// Mock function to simulate URL shortening

export default function Component() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoUrl, setInfoUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortUrl("");

    if (!longUrl) {
      setError("Please enter a URL");
      setIsLoading(false);
      return;
    }

    try {
      const shortID = await getShortUrlId(longUrl);
      if (!shortID) {
        setError("An error occurred while shortening the URL");
        setIsLoading(false);
        return;
      }
      if (shortID.length > 0) {
        setShortUrl(`${window.location.origin}/${shortID}`);
        setInfoUrl(`${window.location.origin}/info/${shortID}`);
      }
    } catch (err: Error | any) {
      setError("An error occurred while shortening the URL :: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-2xl font-bold">URL Shortener</CardTitle>
          <CardDescription className="text-primary-foreground/70">
            Enter a long URL to get a shortened version
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="url"
              placeholder="Enter your long URL here"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Shortening...
                </>
              ) : (
                "Shorten URL"
              )}
            </Button>
          </form>

          {error && (
            <Alert
              variant="destructive"
              className="mt-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {shortUrl && (
            <Alert className="mt-4 bg-primary/10 text-primary border border-primary/20 rounded-md">
              <AlertDescription>
                <strong>Shortened URL:</strong>
                <br />
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener"
                  className="font-medium underline"
                >
                  {shortUrl}
                </a>
              </AlertDescription>
              <br />
              <AlertDescription>
                <strong>Check details here:</strong> <br />
                <a
                  href={infoUrl}
                  target="_blank"
                  rel="noopener"
                  className="font-medium underline"
                >
                  {infoUrl}
                </a>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
