import React, { useEffect, useState } from "react";
import styled from "styled-components";
import findUserInfoApi from "../../api/findUserInfoApi";
import { useLocation } from "react-router-dom";
import FindSuccess from "./FindSuccess";
import FindInfo from "./FindInfo";

function FindMain() {
  const location = useLocation();
  const [sentMail, setSentMail] = useState(false);
  const [code, setCode] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [isFindId, setFindIsFindId] = useState(false);

  const URL = location.pathname;

  useEffect(() => {
    if (URL === "/find-id") {
      setFindIsFindId(true);
    }
  }, []);

  const validEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const find = async () => {
    const inputEmail =
      document.getElementById("firstEmail").value +
      document.getElementById("secondEmail").value;
    if (validEmail(inputEmail)) {
      if (isFindId) {
        const response = await findUserInfoApi.getMyId({ email: inputEmail });
        if (response.success) {
          setSentMail(true);
          setCode(response.authenticationNumber);
          setUserInfo(response.id);
        } else {
          alert(response.msg);
        }
      } else {
        const id = document.getElementById("checkId").value;
        const data = {
          email: inputEmail,
          id,
        };
        const response = await findUserInfoApi.getMyPw(data);
        if (response.success) {
          setSentMail(true);
          setCode(response.authenticationNumber);
          setUserInfo(response.password);
        } else {
          alert(response.msg);
        }
      }
    } else {
      alert("작성한 내용을 다시 확인해 주세요.");
    }
  };

  const checkCode = () => {
    if (document.getElementById("checkCode").value === String(code)) {
      setShowInfo(true);
    }
  };

  return (
    <BackGround>
      <StyleHeader>{isFindId ? "아이디 찾기" : "비밀번호 찾기"}</StyleHeader>
      {showInfo ? (
        <FindSuccess userInfo={userInfo} isFindId={isFindId} />
      ) : (
        <FindInfo
          sentMail={sentMail}
          isFindId={isFindId}
          find={find}
          checkCode={checkCode}
        />
      )}
    </BackGround>
  );
}

export default FindMain;

const BackGround = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleHeader = styled.div`
  color: #393939;
  width: 370px;
  height: 70px;
  margin: 90px 0 122px 0;
  text-align: center;
  font-size: 60px;
  font-family: GmarketSansMedium;
`;
