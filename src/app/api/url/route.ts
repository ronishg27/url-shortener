import { nanoid } from "nanoid";
import { NextRequest } from "next/server";
import URL from "@/models/url.model";
import connectDB from "@/utils/connectDB";

export async function POST(request: NextRequest) {
  connectDB();
  try {
    const body = await request.json();
    if (!body.url) {
      return new Response(JSON.stringify({ error: "url is required" }));
    }

    const shortId = nanoid(8);

    const createdURL = await URL.create({
      shortId,
      redirectURL: body.url,
      visitHistory: [],
    });

    return new Response(JSON.stringify({ shortId: createdURL.shortId }));
  } catch (error: Error | any) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }));
    }
    return new Response(
      JSON.stringify({ error: "An error occurred :: " + error }),
    );
  }
}
