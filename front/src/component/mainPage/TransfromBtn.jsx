import React from "react";
import LightContainer from "../../publicCompent/LightContainer";
import StyleBtn from "../../publicCompent/StyleBtn";
import styled from "styled-components";
import { ReactComponent as XImg } from "../../assets/xImg.svg";

function TransfromBtn({
  reduction,
  setReduction,
  diary,
  setDiary,
  friendViewer,
  setFriendViewer,
  myPageViewer,
  setMyPageViewer,
}) {
  const transfrom = () => {
    setDiary((prev) => !prev);
    setReduction(false);
    document.querySelector("body").style.backgroundColor = diary
      ? "#f2f3f7"
      : "#E8EBF2";
  };

  const closeFriendWindow = () => {
    setReduction(false);
    setFriendViewer(false);
    setMyPageViewer(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <Container reduction={reduction}>
        <div style={{ display: "flex" }}>
          <LightContainer
            tag={
              <StyleBtn
                width={60}
                height={60}
                transfrom={true}
                diary={diary}
                round={true}
                onClick={transfrom}
              >
                {diary ? "할일" : "일기"}
              </StyleBtn>
            }
          />
        </div>
        <div style={{ marginRight: "40px" }}>
          {(friendViewer || myPageViewer) && (
            <Close onClick={closeFriendWindow} />
          )}
        </div>
      </Container>
    </div>
  );
}

export default TransfromBtn;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${({ reduction }) => (reduction ? "1450" : "1000")}px;
  margin: 30px auto 0;
  align-items: center;
`;

const Close = styled(XImg)`
  cursor: pointer;
`;
