import URLmodel from "@/models/url.model";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortId: string } },
) {
  try {
    connectDB();
    // Retrieve Client Info
    const clientIp = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    const host = req.headers.get("host") || "unknown";
    const referer = req.headers.get("referer") || "No referer";
    const acceptLanguage = req.headers.get("accept-language") || "unknown";

    // Log the client info
    console.log("Client IP: ", clientIp);
    console.log("Host: ", host);
    console.log("Referer: ", referer);
    console.log("Accept-Language: ", acceptLanguage);

    // Print specific headers

    const userAgent = req.headers.get("user-agent");
    const shortId = params.shortId;

    if (!shortId) {
      return new Response(JSON.stringify({ error: "shortId is required" }));
    }

    const urlInfo = await URLmodel.findOne({ shortId });

    if (!urlInfo) {
      return new Response(JSON.stringify({ error: "url not found" }));
    }

    const { city, region, country, loc, org, timezone } = await getGeolocation(
      clientIp,
    );

    urlInfo.visitHistory.push({
      timestamp: Date.now(),
      datestamp: new Date(),
      ip: String(clientIp),
      browser: getBrowserInfo(userAgent),
      referer: referer,
      host: host,
      acceptLanguage: acceptLanguage,
      isp: org,
      city,
      region,
      country,
      loc,
      timezone,
    });

    const data = await urlInfo.save();

    if (!data) {
      console.error("Failed to save visit history");
    }

    return NextResponse.redirect(urlInfo.redirectURL);
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }));
  }
}

function getBrowserInfo(userAgent: string | any): string {
  if (userAgent?.includes("Chrome") && userAgent?.includes("Edg")) {
    return "Microsoft Edge";
  } else if (userAgent?.includes("Chrome")) {
    return "Google Chrome";
  } else if (userAgent?.includes("Firefox")) {
    return "Mozilla Firefox";
  } else if (userAgent?.includes("Safari") && !userAgent?.includes("Chrome")) {
    return "Safari";
  } else if (userAgent?.includes("OPR") || userAgent?.includes("Opera")) {
    return "Opera";
  } else if (userAgent?.includes("MSIE") || userAgent?.includes("Trident")) {
    return "Internet Explorer";
  } else {
    return "Unknown";
  }
}

async function getGeolocation(clientIp: string): Promise<any> {
  const resp = await axios.get(
    `https://ipinfo.io/${clientIp}?token=${process.env.IP_INFO_TOKEN}`,
  );
  return resp.data;
}
