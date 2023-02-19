import axios from "axios";

const overlapApi = async (text, type) => {
  const SERVER_URL = "http://13.125.126.246:3000/sign/check";

  const response = await axios.post(SERVER_URL, { [type]: text });
  return response.data;
};

export default overlapApi;
