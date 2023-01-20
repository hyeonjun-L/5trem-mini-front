import { useState } from "react";
import styled from "styled-components";
import SelectUl from "../../publicCompent/SelectUl";

function SelectMonth({ children, month, setMonth }) {
  const monthList = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const [selectMonthList, setSelectMonthList] = useState(
    monthList.filter((Element) => Element !== month)
  );

  return (
    <div style={{ display: "flex", height: "80px", alignItems: "flex-end" }}>
      <Month>{month}</Month>
      <SelectUl
        selectList={selectMonthList}
        setSelectList={setSelectMonthList}
        value={month}
        changeValue={setMonth}
      >
        {children}
      </SelectUl>
    </div>
  );
}

export default SelectMonth;

const Month = styled.div`
  user-select: none;
  font-size: 40px;
  font-family: GmarketSansMedium;
  color: #707070;
`;
