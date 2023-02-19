import axios from "axios";

const findUserInfoApi = {
  async getMyId(data) {
    const SERVER_URL = "http://13.125.126.246:3000/find/id";
    const response = await axios.post(SERVER_URL, data);
    return response.data;
  },

  async getMyPw(data) {
    const SERVER_URL = "http://13.125.126.246:3000/find/password";

    const response = await axios.post(SERVER_URL, data);
    return response.data;
  },
};

export default findUserInfoApi;
