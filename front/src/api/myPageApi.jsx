import axios from "axios";

const myPageApi = {
  async getMyInfo() {
    const SERVER_URL =
      "http://13.125.126.246:3000/profiles/" + localStorage.getItem("myID");

    const response = await axios.get(SERVER_URL);
    return response.data;
  },

  async updateMyInfo(fromData) {
    const SERVER_URL =
      "http://13.125.126.246:3000/profiles/" +
      localStorage.getItem("myID") +
      "?directory=user";

    const response = await axios.put(SERVER_URL, fromData);
    return response.data;
  },
};

export default myPageApi;
