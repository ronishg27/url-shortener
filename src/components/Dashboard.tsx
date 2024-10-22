"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableRow,
  TableCaption,
  TableHead,
  TableHeader,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { VerifyPassKey } from "@/components/verify-passkey";
import { URLInfo } from "@/lib/interface";
import { getUrls } from "@/utils/getAllUrls";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [urls, setUrls] = useState<URLInfo[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVerified) {
      getUrls().then((res) => {
        setUrls(res);
        setLoading(false);
      });
    }
  }, [isVerified]);

  if (!isVerified) {
    return <VerifyPassKey setIsVerified={setIsVerified} />;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">URL Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>List of URLs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Original URL</TableHead>
                <TableHead>Shortened ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urls.map((url) => (
                <TableRow key={url._id}>
                  <TableCell>{url.redirectURL}</TableCell>
                  <TableCell className="underline">
                    <Link href={`/info/${url.shortId}`}>{url.shortId}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
