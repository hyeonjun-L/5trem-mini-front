import axios from "axios";

const holidayApi = {
  async getHoliday(year, month) {
    const SERVER_URL =
      "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?" +
      `solYear=${year}&` +
      `solMonth=${month}&` +
      `ServiceKey=${process.env.REACT_APP_OPEN_API_KEY}`;

    const response = await axios.get(SERVER_URL);
    const date = response.data.response.body.items.item;
    return date ? (date.length >= 2 ? date : [date]) : [];
  },
};

export default holidayApi;
