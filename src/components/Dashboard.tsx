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
import { Skeleton } from "./ui/skeleton";
import { set } from "mongoose";

export const Dashboard = () => {
  const [urls, setUrls] = useState<URLInfo[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const urls = await getUrls();
        setUrls(urls);
      } catch (error) {
        console.error("Failed to fetch URLs", error);
      } finally {
        setLoading(false);
      }
    };
    if (isVerified) {
      fetchUrls();
    }
  }, [isVerified]);

  if (!isVerified) {
    return <VerifyPassKey setIsVerified={setIsVerified} />;
  }

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Skeleton className="h-8 w-64" />
    </div>
  ) : (
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
