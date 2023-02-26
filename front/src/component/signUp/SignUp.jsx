import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackGround from "../../publicCompent/BackGround";
import LightContainer from "../../publicCompent/LightContainer";
import InputText from "../../publicCompent/InputText";
import StyleHeader from "../../publicCompent/StyleHeader";
import SelectContainer from "./SelectContainer";
import CheckBox from "./CheckBox";
import StyleBtn from "../../publicCompent/StyleBtn";
import overlap from "./overlap";
import signUpApi from "../../api/signUpApi";

export default function SignUp() {
  const [overlapCheck, setOverlapCheck] = useState({
    idCheck: "",
    idText: "",
    nickNameCheck: "",
    nickNameText: "",
  });

  const [checkList, setCheck] = useState({
    fullAgreement: false,
    termsOfUse: false,
    privacy: false,
    sms: false,
    email: false,
  });

  const AllCheck = () => {
    const state = !checkList.fullAgreement;
    setCheck({
      fullAgreement: state,
      termsOfUse: state,
      privacy: state,
      sms: state,
      email: state,
    });
  };

  const SingleCheck = (e) => {
    const checkListALLTrue =
      !Object.values(checkList).slice(1, 4).includes(false) && e.target.checked;
    if (checkListALLTrue) {
      setCheck({
        fullAgreement: true,
        termsOfUse: true,
        privacy: true,
        sms: true,
        email: true,
      });
    } else {
      setCheck((check) => {
        return { ...check, [e.target.id]: e.target.checked };
      });
    }
  };

  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
    checkPassword: "",
    name: "",
    nickName: "",
    senterPhoneNum: "",
    lastPhoneNum: "",
    firstEmaile: "",
    lastEmaile: "",
  });

  const debounceOnChange = debounce(async (name, value) => {
    setUserInfo((user) => {
      return { ...user, [name]: value };
    });
    if (name === "id") {
      const [idCheck, idText] = await overlap.idCheck(value);
      setOverlapCheck((check) => {
        return { ...check, ["idCheck"]: idCheck, ["idText"]: idText };
      });
    } else if (name === "nickName") {
      const [nickNameCheck, nickNameText] = await overlap.nickNameCheck(value);
      setOverlapCheck((check) => {
        return {
          ...check,
          ["nickNameCheck"]: nickNameCheck,
          ["nickNameText"]: nickNameText,
        };
      });
    }
  }, 250);
  const [passwordCheck, passwordText] = overlap.passwordCheck(
    userInfo.password,
    userInfo.checkPassword
  );

  const onChangeAccount = (e) => {
    debounceOnChange(e.target.name, e.target.value);
  };

  const stringFilterChangeAccount = (e) => {
    let inputText = e.target.value.replace(/[^-0-9]/g, "");
    e.target.value = inputText;
    if (inputText.length > 4) {
      inputText = inputText.substr(0, 4);
      e.target.value = inputText;
    }
    debounceOnChange(e.target.name, e.target.value);
  };

  const arr = [
    {
      id: "termsOfUse",
      description: "이용약관에 동의 하십니까?",
      isRequired: true,
    },
    {
      id: "privacy",
      description: "개인정보 수집 및 이용에 동의하십니까?",
      isRequired: true,
    },
    { id: "sms", description: "SMS 수신을 동의 하십니까?", isRequired: false },
    {
      id: "email",
      description: "이메일 수신을 동의 하십니까?",
      isRequired: false,
    },
  ];

  const navigate = useNavigate();
  async function signUp() {
    const checkUserInfo = Object.values(userInfo).indexOf("");
    const userInfoBlankList = [
      "아이디",
      "비밀번호",
      "비밀번호 확인",
      "이름",
      "닉네임",
      "핸드폰",
      "핸드폰",
      "이메일",
      "이메일",
    ];

    const termsAgree = Object.values(checkList);

    if (checkUserInfo !== -1) {
      return alert(
        `${userInfoBlankList[checkUserInfo]} 입력칸 확인 부탁드립니다.`
      );
    } else if (overlapCheck.idCheck) {
      return alert("이미 사용중인 아이디 입니다.");
    } else if (passwordCheck) {
      return alert("비밀번호가 일치하지 않습니다.");
    } else if (overlapCheck.nickNameCheck) {
      return alert("이미 사용중인 닉네임 입니다.");
    } else if (!(termsAgree[1] && termsAgree[2])) {
      return alert("필수 약관에 동의하셔야 회원가입이 가능 합니다.");
    } else
      (await signUpApi(userInfo)) ? navigate("/login") : alert("회원가입 실패");
  }

  return (
    <BackGround>
      <StyleHeader>회원가입</StyleHeader>
      <div
        style={{
          width: "621px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MediumText>아이디</MediumText>
        <DoubleCheckText Check={overlapCheck.idCheck}>
          {overlapCheck.idText}
        </DoubleCheckText>
      </div>
      <div style={{ height: "77px" }}>
        <LightContainer
          tag={
            <InputText
              width={621}
              height={60}
              maxLength="20"
              name="id"
              onChange={onChangeAccount}
            />
          }
        />
      </div>

      <MediumText style={{ width: "621px" }}>비밀번호</MediumText>
      <div style={{ height: "77px" }}>
        <LightContainer
          tag={
            <InputText
              width={621}
              height={60}
              name="password"
              type="password"
              onChange={onChangeAccount}
            />
          }
        />
      </div>

      <div
        style={{
          width: "621px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MediumText>비밀번호 재확인</MediumText>
        <DoubleCheckText Check={passwordCheck}>{passwordText}</DoubleCheckText>
      </div>

      <div style={{ height: "77px" }}>
        <LightContainer
          tag={
            <InputText
              width={621}
              height={60}
              name="checkPassword"
              type="password"
              onChange={onChangeAccount}
            />
          }
        />
      </div>

      <MediumText style={{ width: "621px" }}>이름</MediumText>
      <div style={{ height: "77px" }}>
        <LightContainer
          tag={
            <InputText
              width={621}
              height={60}
              maxLength="20"
              name="name"
              onChange={onChangeAccount}
            />
          }
        />
      </div>

      <div
        style={{
          width: "621px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MediumText>닉네임</MediumText>
        <DoubleCheckText Check={overlapCheck.nickNameCheck}>
          {overlapCheck.nickNameText}
        </DoubleCheckText>
      </div>

      <div style={{ height: "77px" }}>
        <LightContainer
          tag={
            <InputText
              width={621}
              height={60}
              maxLength="20"
              name="nickName"
              onChange={onChangeAccount}
            />
          }
        />
      </div>

      <MediumText style={{ width: "621px" }}>핸드폰</MediumText>
      <div
        style={{
          height: "77px",
          width: "645px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <MediumText
          style={{ marginLeft: "27px", marginRight: "30px" }}
          lineHeight={60}
        >
          010
        </MediumText>
        <MediumText style={{ marginRight: "30px" }} lineHeight={60}>
          -
        </MediumText>
        <div style={{ marginRight: "30px" }}>
          <LightContainer
            tag={
              <InputText
                width={215}
                height={60}
                name="senterPhoneNum"
                onChange={stringFilterChangeAccount}
              />
            }
          />
        </div>
        <MediumText style={{ marginRight: "30px" }} lineHeight={60}>
          -
        </MediumText>
        <LightContainer
          tag={
            <InputText
              width={215}
              height={60}
              name="lastPhoneNum"
              onChange={stringFilterChangeAccount}
            />
          }
        />
      </div>

      <MediumText style={{ width: "621px" }}>이메일</MediumText>
      <div
        style={{
          height: "130px",
          width: "645px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ marginRight: "10px" }}></div>
        <LightContainer
          tag={
            <InputText
              width={286}
              height={60}
              name="firstEmaile"
              onChange={onChangeAccount}
            />
          }
        />
        <MediumText
          style={{ marginLeft: "15px", marginRight: "15px" }}
          lineHeight={60}
        >
          @
        </MediumText>
        <LightContainer
          tag={
            <SelectContainer
              width={287}
              height={60}
              name="lastEmaile"
              onChange={onChangeAccount}
            />
          }
        />
      </div>

      <MediumText
        style={{ height: "48px", width: "621px", marginLeft: "35px" }}
      >
        이용약관 & 수신
      </MediumText>
      <div
        style={{
          height: "100px",
          width: "621px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <LightContainer
          tag={
            <CheckBox
              width={40}
              height={40}
              round={true}
              allcheck={true}
              id="fullAgreement"
              checked={!Object.values(checkList).includes(false)}
              checkAccount={AllCheck}
            />
          }
        />
        <MediumText style={{ marginLeft: "10px" }} lineHeight={45}>
          전체동의
        </MediumText>
      </div>
      {arr.map((el, i) => {
        return (
          <div
            key={i}
            style={{
              height: "55px",
              width: "621px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <LightContainer
              tag={
                <CheckBox
                  width={40}
                  height={40}
                  id={el.id}
                  checked={checkList[el.id]}
                  checkAccount={SingleCheck}
                />
              }
            />
            <MediumText
              style={{ marginLeft: "10px" }}
              lineHeight={45}
              fontSize={16}
            >{`[${el.isRequired ? "필수" : "선택"}]`}</MediumText>
            <MediumText
              style={{ marginLeft: "42px" }}
              lineHeight={45}
              fontSize={16}
            >
              {el.description}
            </MediumText>
          </div>
        );
      })}
      <div style={{ height: "80px" }}></div>
      <div style={{ height: "207px" }}>
        <LightContainer
          tag={
            <StyleBtn width={400} height={80} onClick={signUp}>
              <div style={{ margin: "12px" }}>회원가입</div>
            </StyleBtn>
          }
        />
      </div>
    </BackGround>
  );
}

const MediumText = styled.div`
  height: 28px;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 20)}px;
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 24)}px;
  font-family: GmarketSansMedium;
  color: #9b9b9b;
  vertical-align: middle;
`;

const DoubleCheckText = styled.div`
  color: ${({ Check }) => (Check ? "red" : "blue")};
  font-size: 15px;
  line-height: 28px;
  font-family: GmarketSansMedium;
`;
