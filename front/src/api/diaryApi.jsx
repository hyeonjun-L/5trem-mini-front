import axios from "axios";

const diaryApi = {
  async checkDiary(year, month) {
    const SERVER_URL =
      "http://13.125.126.246:3000/diaries/" +
      localStorage.getItem("userID") +
      "/months/" +
      year +
      "-" +
      month;

    const response = await axios.get(SERVER_URL);
    return response.data;
  },

  async importDiary(day) {
    const SERVER_URL =
      "http://13.125.126.246:3000/diaries/" +
      localStorage.getItem("userID") +
      "/" +
      day[0] +
      "-" +
      (day[1] + 1) +
      "-" +
      day[2];

    const response = await axios.get(SERVER_URL);
    return response;
  },

  async enrollmentDiary(data, date) {
    const SERVER_URL =
      "http://13.125.126.246:3000/diaries/" +
      localStorage.getItem("userID") +
      "/" +
      date +
      "?directory=diary";

    const response = await axios.post(SERVER_URL, data);
  },

  async updateDiary(data, date) {
    const SERVER_URL =
      "http://13.125.126.246:3000/diaries/" +
      localStorage.getItem("userID") +
      "/" +
      date +
      "/" +
      localStorage.getItem("diaryNum") +
      "?directory=diary";
    const response = await axios.put(SERVER_URL, data);
  },

  async deletDiary(date) {
    const SERVER_URL =
      "http://13.125.126.246:3000/diaries/" +
      localStorage.getItem("userID") +
      "/" +
      localStorage.getItem("diaryNum");

    const response = await axios.delete(SERVER_URL, date);
  },
};

export default diaryApi;
