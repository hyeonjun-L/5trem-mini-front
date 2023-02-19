import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LightContainer from "../../publicCompent/LightContainer";
import InputText from "../../publicCompent/InputText";
import StyleHeader from "../../publicCompent/StyleHeader";
import StyleBtn from "../../publicCompent/StyleBtn";
import BackGround from "../../publicCompent/BackGround";
import loginApi from "../../api/loginApi";

function Login() {
  window.localStorage.setItem("userID", "");
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
  });

  const moveMainPage = async () => {
    if (await loginApi(userInfo)) {
      navigate("/mainPage");
      window.localStorage.setItem("userID", userInfo.id);
      window.localStorage.setItem("myID", userInfo.id);
    } else {
      alert(`아이디 또는 비밀번호를 잘못 입력했습니다.
      입력하신 내용을 다시 확인해주세요.`);
    }
  };

  const onChangeAccount = (text) => {
    setUserInfo((user) => {
      return { ...user, [text.target.name]: text.target.value };
    });
  };

  const moveSignUp = () => {
    navigate("/signUp");
  };

  const moveFindId = () => {
    navigate("/find-id");
  };

  const moveFindPW = () => {
    navigate("/find-password");
  };

  const enterkey = (e) => {
    if (e.keyCode === 13) {
      moveMainPage();
    }
  };

  return (
    <BackGround>
      <StyleHeader>로그인</StyleHeader>
      <div style={{ height: "90px" }}>
        <LightContainer
          tag={
            <InputText
              width={621}
              height={60}
              name="id"
              placeholder="아이디"
              onChange={onChangeAccount}
              id="userID"
              onKeyUp={enterkey}
            />
          }
        />
      </div>
      <div style={{ height: "70px" }}>
        <LightContainer
          tag={
            <InputText
              width={621}
              height={60}
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={onChangeAccount}
              onKeyUp={enterkey}
            />
          }
        />
      </div>
      <div
        style={{
          height: "130px",
          width: "645px",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <div>
          <StyleTextBtn onClick={moveFindId}>아이디 찾기</StyleTextBtn>
          <StyleTextBtn onClick={moveFindPW}>비밀번호 찾기</StyleTextBtn>
          <StyleTextBtn right={true} onClick={moveSignUp}>
            회원가입
          </StyleTextBtn>
        </div>
      </div>
      <div style={{ height: "207px" }}>
        <LightContainer
          tag={
            <StyleBtn width={400} height={80} onClick={moveMainPage}>
              <div style={{ margin: "12px" }}>로그인</div>
            </StyleBtn>
          }
        />
      </div>
    </BackGround>
  );
}

const StyleTextBtn = styled.span`
  border-right: ${({ right }) => (right ? "none" : "2px solid #b1a7a7")};

  letter-spacing: 0px;
  font-family: GmarketSansMedium;
  padding: 4px 8px;
  color: #707070;
  user-select: none;
  cursor: pointer;
`;

export default Login;
