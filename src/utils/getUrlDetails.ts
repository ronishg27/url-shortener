import { URLInfo } from "@/lib/interface";
import axios from "axios";

const getURLDetails = async (shortId: string): Promise<URLInfo> => {
  try {
    const response = await axios.get(`/api/url/${shortId}`);
    return await response.data.urlInfo;
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
};

export default getURLDetails;
