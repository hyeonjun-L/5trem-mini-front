import React from "react";
import styled from "styled-components";

/**
 * 텍스트 타입의 input styled component
 * @param {Number} width input 가로길이(px단위)
 * @param {Number} height input 세로길이(px단위)
 * @returns width와 height의 값이 적용된 button box
 */

const StyleBtn = styled.button`
  color: ${({ blue }) => (blue ? "#FFFFFF" : "#393939")};
  position: absolute;

  width: ${({ width }) => width - 10}px;
  height: ${({ height }) => height - 10}px;

  background: ${({ blue }) =>
    blue
      ? "#1A2C5A96"
      : "linear-gradient(100deg, #e8ebf2 0%, #b8c0d1 0%, #d9deeb 100%)"};
  box-shadow: 5px 5px 20px #0f296b66;
  border: 0px solid #ffffff;
  border-radius: ${({ diary }) => (diary ? "50%" : "10px")};
  font-size: ${({ transfrom }) => (transfrom ? "15" : "40")}px;
  font-family: ${({ transfrom }) =>
    transfrom ? "GmarketSansMedium" : "GmarketSansBold"};
  user-select: none;
  cursor: pointer;
`;

export default StyleBtn;
