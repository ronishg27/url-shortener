import connectDB from "@/utils/connectDB";
import { NextRequest } from "next/server";
import URLModel from "@/models/url.model";

export async function GET(
  request: NextRequest,
  { params }: { params: { shortId: string } },
) {
  connectDB();

  try {
    const shortId = params.shortId;
    if (!shortId) {
      return new Response(JSON.stringify({ error: "url is required" }));
    }

    const urlInfo = await URLModel.findOne({ shortId: shortId });

    if (!urlInfo) {
      return new Response(JSON.stringify({ error: "url not found" }));
    }

    return new Response(JSON.stringify({ urlInfo }));
  } catch (error: Error | any) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }));
    }

    return new Response(
      JSON.stringify({ error: "An error occurred :: " + error }),
    );
  }
}
