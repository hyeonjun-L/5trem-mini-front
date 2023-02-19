import React from "react";
import styled from "styled-components";
import InputText from "../../publicCompent/InputText";
import LightContainer from "../../publicCompent/LightContainer";
import StyleBtn from "../../publicCompent/StyleBtn";
import FindInputEmail from "./FindInput";

function FindInfo({ sentMail, find, checkCode, isFindId }) {
  return (
    <>
      <CustomSelect>
        {isFindId
          ? "아이디는 가입시 입력하신 이메일을 통해 찾을수 있습니다."
          : "비밀번호는 가입시 입력하신 아이디와, 이메일을 통해 찾을수 있습니다."}
      </CustomSelect>
      {isFindId ? (
        <FindInputEmail />
      ) : (
        <>
          <CustomSelect2>아이디</CustomSelect2>
          <LightContainer
            tag={<InputText width={645} height={60} id="checkId"></InputText>}
          />
          <CustomSelect2>이메일</CustomSelect2>
          <FindInputEmail />
        </>
      )}

      <CheckCodeContainer>
        {sentMail && (
          <>
            <CustomSelect style={{ margin: "60px 0 40px 0 " }}>
              입력한 이메일에서 코드를 확인 후 입력해 주세요.
            </CustomSelect>
            <LightContainer
              tag={
                <InputText width={260} height={70} id="checkCode"></InputText>
              }
            />
          </>
        )}
      </CheckCodeContainer>
      <LightContainer
        tag={
          <StyleBtn
            width={400}
            height={90}
            onClick={sentMail ? checkCode : find}
          >
            {sentMail ? "확인" : isFindId ? "아이디 찾기" : "비밀번호 찾기"}
          </StyleBtn>
        }
      />
    </>
  );
}

export default FindInfo;

const CustomSelect = styled.div`
  font: 24px/29px GmarketSansMedium;
  color: #707070;
  width: 805px;
  height: 30px;
  margin-bottom: 23px;
  text-align: center;
`;

const CheckCodeContainer = styled.div`
  width: 655px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomSelect2 = styled.div`
  width: 655px;
  height: 30px;
  margin-top: 30px;
  font: 20px/24px GmarketSansMedium;
  color: #707070;
`;
