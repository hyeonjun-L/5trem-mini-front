import axios from "axios";

const commentApi = {
  async getToDoListComment(day) {
    const SERVER_URL =
      "http://13.125.126.246:3000/todoComment/" +
      localStorage.getItem("userID") +
      "/" +
      day;

    const response = await axios.get(SERVER_URL);
    return response.data;
  },

  async addToDoListComment(data) {
    const SERVER_URL = "http://13.125.126.246:3000/todoComment/";

    const response = await axios.post(SERVER_URL, data);
    return response.data;
  },

  async updateToDoListComment(data) {
    const SERVER_URL = "http://13.125.126.246:3000/todoComment/";

    const response = await axios.patch(SERVER_URL, data);
    return response.data;
  },

  async deleteToDoListComment(data) {
    const SERVER_URL = "http://13.125.126.246:3000/todoComment/";

    const response = await axios.delete(SERVER_URL, { data });
    return response.data;
  },
};

export default commentApi;
