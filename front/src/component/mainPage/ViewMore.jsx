import React from "react";
import styled from "styled-components";

function ViewMore({ setFriendViewer }) {
  return (
    <SelectItem onClick={() => setFriendViewer(true)}>+ 더보기</SelectItem>
  );
}

const SelectItem = styled.li`
  width: 160px;
  display: flex;
  justify-content: center;
  padding-top: 15px;
  font: 15px GmarketSansMedium;
  color: #000000;
  user-select: none;
  cursor: pointer;
`;

export default ViewMore;
