import { URLInfo } from "@/lib/interface";
import axios from "axios";

export async function getUrls(): Promise<URLInfo[]> {
  try {
    const response = await axios.get("/api/all-urls");
    console.log(response.data.urls);
    return response.data.urls;
  } catch (error) {
    console.error(error);
  }
  return [];
}
