import React from "react";
import styled from "styled-components";

/**
 * 텍스트 타입의 input styled component
 * @param {Number} width input 가로길이(px단위)
 * @param {Number} height input 세로길이(px단위)
 * @returns width와 height의 값이 적용된 input text box
 */
const InputText = styled.input`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  background: linear-gradient(95deg, #e8ebf2 0%, #e8ebf2 0%, #f2f3f7 100%);
  box-shadow: 5px 5px 20px #0f296b33;
  border: 0.2px solid #ffffff;
  border-radius: 10px;
  padding-left: 20px;
  font-family: SCDream5;
  font-size: 20px;
  letter-spacing: 0px;
  color: #707070;
  outline: none;
`;

export default InputText;
