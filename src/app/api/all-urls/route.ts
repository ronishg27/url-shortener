import URLModel from "@/models/url.model";
import connectDB from "@/utils/connectDB";

export async function GET() {
  try {
    connectDB();
    const urls = await URLModel.find({}).exec();
    if (!urls) {
      return new Response(JSON.stringify({ error: "No urls found" }));
    }
    return new Response(JSON.stringify({ urls }));
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
}
