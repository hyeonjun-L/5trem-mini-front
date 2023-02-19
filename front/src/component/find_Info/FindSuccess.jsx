import React from "react";
import styled from "styled-components";
import StyleBtn from "../../publicCompent/StyleBtn";
import LightContainer from "../../publicCompent/LightContainer";
import { useNavigate } from "react-router-dom";

function FindSuccess({ userInfo, isFindId }) {
  const navigate = useNavigate();

  const moveLogin = () => {
    navigate("/login");
  };

  const moveFindPw = () => {
    navigate("/find-password");
    window.location.reload();
  };

  return (
    <>
      <CustomSelect>
        회원님의 {isFindId ? "아이디" : "비밀번호"} 찾기가 완료 됐습니다.
      </CustomSelect>
      <CustomSelect style={{ margin: "39px 0 157px 0" }}>
        회원님의 {isFindId ? "아이디" : "비밀번호"}는<UserId>{userInfo}</UserId>
        입니다.
      </CustomSelect>
      <LightContainer
        tag={
          <StyleBtn width={400} height={90} onClick={moveLogin}>
            {"로그인"}
          </StyleBtn>
        }
      />
      <div style={{ marginBottom: " 20px" }}></div>
      {isFindId && (
        <LightContainer
          tag={
            <StyleBtn width={400} height={90} onClick={moveFindPw} blue={true}>
              {"비밀번호 찾기"}
            </StyleBtn>
          }
        />
      )}
    </>
  );
}

export default FindSuccess;

const UserId = styled.span`
  font: 28px/24px GmarketSansBold;
  color: #707070;
  margin: 0 20px 0 20px;
`;

const CustomSelect = styled.div`
  font: 24px/29px GmarketSansMedium;
  color: #707070;
  width: 615px;
  height: 30px;
  margin-bottom: 20px;
  text-align: center;
`;
