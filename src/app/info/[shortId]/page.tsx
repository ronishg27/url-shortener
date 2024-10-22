"use client";
import getURLDetails from "@/utils/getUrlDetails";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { URLInfo, VisitHistory } from "@/lib/interface";

const InfoPage = ({ params }: { params: { shortId: string } }) => {
  const shortId = params.shortId;

  const [urlInfo, setUrlInfo] = useState<URLInfo>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrlInfo = async () => {
      try {
        const urlInfo = await getURLDetails(shortId);
        setUrlInfo(urlInfo);
      } catch (error) {
        console.error("Failed to fetch URL details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUrlInfo();
  }, [shortId]);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Skeleton className="h-8 w-64" />
    </div>
  ) : (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
      {/* Card for URL Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">URL Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>Short Id:</strong> <span>{shortId}</span>
          </div>
          <div>
            <strong>Original URL:</strong>{" "}
            <span className="break-all">{urlInfo?.redirectURL}</span>
          </div>
          <div>
            <strong>Created at:</strong>{" "}
            <span>{new Date(urlInfo?.createdAt || "").toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Table for Visit History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Visit History</CardTitle>
        </CardHeader>
        <CardContent>
          {urlInfo?.visitHistory.length ? (
            <Table>
              <TableCaption>List of clicks for {shortId}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>SN</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Browser</TableHead>
                  <TableHead>Referer</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>ISP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {urlInfo?.visitHistory.map(
                  (visit: VisitHistory, index: number) => (
                    <TableRow key={visit._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{visit.ip}</TableCell>
                      <TableCell>{visit.browser}</TableCell>
                      <TableCell>{visit.referer}</TableCell>
                      <TableCell>{visit.city}</TableCell>
                      <TableCell>{visit.region}</TableCell>
                      <TableCell>{visit.country}</TableCell>
                      <TableCell>{visit.isp}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No visits recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoPage;
