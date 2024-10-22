import axios from "axios";

const getShortUrlId = async (url: string): Promise<string> => {
  const response = await axios.post("api/url", { url });

  console.log(response.data);

  const shortId = response.data.shortId;

  return shortId;
};

export default getShortUrlId;
