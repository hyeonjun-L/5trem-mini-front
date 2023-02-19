import { useState } from "react";

function YearCounter(currentYear) {
  let arr = [];
  for (let i = 0; i < 16; i++) {
    if (currentYear + i < 2101) {
      arr[arr.length] = currentYear + i;
    } else {
      arr[arr.length] = "";
    }
  }

  const [yearList, setYearList] = useState(arr);

  const increaseYearList = () => {
    const listInMax = Math.max(...yearList);

    if (listInMax < 2100) {
      setYearList(
        yearList.map((year, index) =>
          yearList[yearList.length - 1] + index + 1 > 2100
            ? ""
            : yearList[yearList.length - 1] + index + 1
        )
      );
    }
  };

  const decreaseYearList = () => {
    const filteredYearList = yearList.filter((year) => year !== "");
    const listInMin = Math.min(...filteredYearList);

    if (listInMin > 1970) {
      setYearList(
        yearList
          .map((year, index) =>
            listInMin - index - 1 < 1970 ? "" : listInMin - index - 1
          )
          .sort((a, b) => a - b)
      );
    }
  };

  return [yearList, increaseYearList, decreaseYearList];
}

export default YearCounter;
