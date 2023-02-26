import React from "react";
import styled from "styled-components";
/**
 * 좌측상단 뒤에 빛이 생기는 효과를 주는 함수형 component
 * @param {Tag} tag={<효과 받고 싶은/>} 효과를 받고 싶은 태그 props로 width, height 입력, 태그 둥근형태면 round={true} 입력
 * @returns width 및 height 만큼 children tag 뒤에 빛이 나는 효과를 준다.
 */
function LightContainer({ tag }) {
  return (
    <Container width={tag.props.width} height={tag.props.height}>
      <Light
        width={tag.props.width}
        height={tag.props.height}
        round={tag.props.round}
      />
      <span style={{ position: "absolute" }}>{tag}</span>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const Light = styled.div`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  right: ${({ round }) => (round ? 6 : 10)}px;
  bottom: ${({ round }) => (round ? 4 : 7)}px;
  border-radius: ${({ round }) => (round ? "50%" : "10px")};
  background: #ffffff 0% 0% no-repeat padding-box;
  filter: blur(4px);
  background-color: white;
`;

export default LightContainer;
