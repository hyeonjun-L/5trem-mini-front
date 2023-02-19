import axios from "axios";

const loginApi = async (userInfo) => {
  const SERVER_URL = "http://13.125.126.246:3000/sign/login";

  const response = await axios.post(SERVER_URL, userInfo);
  return response.data.success;
};

export default loginApi;
