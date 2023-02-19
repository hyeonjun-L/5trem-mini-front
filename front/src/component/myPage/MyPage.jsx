import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LightContainer from "../../publicCompent/LightContainer";
import myPageApi from "../../api/myPageApi";
import changePhone from "./changePhone";
import defaultImg from "../../assets/default.jpg";
import { ReactComponent as CirclesSvg } from "../../assets/smallThreeCircles.svg";
import isValid from "./isValid";

function MyPage(props) {
  const [myInfo, setMyInfo] = useState([]);
  const [previewImg, setPreviewImg] = useState("");
  const [imgData, setImgData] = useState("");
  const [isImg, setIsImg] = useState(false);

  const [updateInfo, setUpdateInfo] = useState(false);
  const [showDeleteImg, setShowDeleteImg] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await myPageApi.getMyInfo();
      setMyInfo([
        { id: "userID", InfoTitle: "ID", content: response.id },
        { id: "password", InfoTitle: "PW", content: response.password },
        { id: "name", InfoTitle: "이름", content: response.name },
        { id: "phone", InfoTitle: "휴대전화", content: response.phone },
        { id: "nickName", InfoTitle: "닉네임", content: response.nickname },
        { id: "email", InfoTitle: "이메일", content: response.email },
      ]);
      setPreviewImg(
        response.image
          ? response.image + `?time=${new Date().getTime()}`
          : defaultImg
      );
    })();
  }, [updateInfo]);

  const readImg = (e) => {
    setIsImg(true);
    const fileReader = new FileReader();
    const data = e.target;
    fileReader.onload = function () {
      const dataURL = fileReader.result;
      setPreviewImg(dataURL);
    };
    fileReader.readAsDataURL(data.files[0]);
    setImgData(data.files[0]);
  };

  const deleteImg = () => {
    setIsImg(true);
    setPreviewImg(defaultImg);
  };

  const update = async () => {
    const formData = new FormData();
    const elements = [
      {
        id: "phone",
        validator: isValid.PhoneNum,
        message: "휴대전화 번호를 확인해 주세요",
      },
      {
        id: "email",
        validator: isValid.Email,
        message: "이메일 양식을 확인해 주세요",
      },
      { id: "password" },
      { id: "name" },
      { id: "nickName" },
    ];

    for (const element of elements) {
      const value = document.getElementById(element.id).value;
      if (element.validator && !element.validator(value)) {
        document.getElementById(element.id).focus();
        return alert(element.message);
      }
      formData.append(element.id, value);
    }
    formData.append("image", imgData);
    formData.append("isImage", isImg);
    const response = await myPageApi.updateMyInfo(formData);
    if (!response.success) {
      alert(response.error);
      document.getElementById("nickName").focus();
    }
    setUpdateInfo(!updateInfo);
    alert("내 정보가 수정됐습니다.");
  };

  return (
    <MyPageContainer>
      <GreetingsContainer>
        {myInfo.length > 0 && <NickName>{myInfo[4].content}</NickName>}
        <Greetings>님 안녕하세요!</Greetings>
      </GreetingsContainer>
      <ImgContainer>
        <ThreeCircles
          onMouseOver={() => setShowDeleteImg(true)}
          onMouseOut={() => setShowDeleteImg(false)}
        >
          <CirclesSvg />
          {showDeleteImg && <State onClick={deleteImg}>이미지 삭제</State>}
        </ThreeCircles>
        <input
          type={"file"}
          id={"uploadImg"}
          onChange={readImg}
          style={{ display: "none" }}
        />
        <label htmlFor="uploadImg">
          <LightContainer
            tag={<Img width={210} height={210} round={true} src={previewImg} />}
          />
        </label>
      </ImgContainer>
      <UserInfoContainer>
        {myInfo.map((value) => {
          return (
            <React.Fragment key={value.id}>
              <UserInfoTitle>{value.InfoTitle}</UserInfoTitle>
              <UserInfo
                id={value.id}
                onBlur={
                  value.InfoTitle === "휴대전화"
                    ? changePhone.phoneNumberBlur
                    : null
                }
                onChange={
                  value.InfoTitle === "휴대전화"
                    ? changePhone.phoneNumberChange
                    : null
                }
                maxLength={value.InfoTitle === "닉네임" ? 20 : null}
                defaultValue={value.content}
                readOnly={value.InfoTitle === "ID"}
                type={value.InfoTitle === "PW" ? "password" : null}
              ></UserInfo>
            </React.Fragment>
          );
        })}
      </UserInfoContainer>
      <SortRight>
        <LightContainer
          tag={
            <UpdateBtn width={67} height={40} onClick={update}>
              수정
            </UpdateBtn>
          }
        />
      </SortRight>
    </MyPageContainer>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  width: 570px;
  height: 430px;
  display: flex;
  flex-wrap: wrap;
`;

const ImgContainer = styled.div`
  width: 210px;
  height: 220px;
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 5px 5px 20px #0f296b26;
  background-color: #b8c0d1;
  cursor: pointer;
`;

const GreetingsContainer = styled.div`
  width: 430px;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const NickName = styled.div`
  height: 25px;
  font: 25px/30px GmarketSansMedium;
  color: #393939;
`;

const Greetings = styled.div`
  height: 15px;
  margin: 8px 0 0 6px;
  font: 15px/18px GmarketSansMedium;
  color: #707070;
`;

const UserInfoContainer = styled.div`
  width: 348px;
  height: 220px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  font: 14px/16px GmarketSansMedium;
  color: #707070;
`;

const UserInfoTitle = styled.div`
  width: 80px;
  height: 18px;
`;

const UserInfo = styled.input`
  width: 240px;
  height: 18px;
  border: none;
  background: transparent;
  outline: none;
  font: 14px/16px GmarketSansMedium;
  color: #707070;
`;

const UpdateBtn = styled.div`
  width: 57px;
  height: 30px;
  padding: 8px 0 0 14px;

  background: linear-gradient(117deg, #e8ebf2 0%, #b8c0d1 0%, #d9deeb 100%);
  box-shadow: 5px 5px 10px #0f296b66;
  border-radius: 7px;

  font: 15px/18px GmarketSansMedium;
  color: #393939;

  user-select: none;
  cursor: pointer;
`;

const SortRight = styled.div`
  width: 558px;
  display: flex;
  justify-content: center;
`;

const ThreeCircles = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: 9;
`;

const State = styled.span`
  position: absolute;
  width: 110px;
  height: 28px;
  left: -40px;
  top: -28px;

  background: rgb(115 115 115 / 75%);
  box-shadow: inset 5px 5px 20px #222222a2, 7px 7px 15px #0000009e;
  backdrop-filter: blur(2px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  user-select: none;
  cursor: pointer;
  text-align: center;
  padding-top: 6px;
  color: #ffffff;
  font: 14px/18px GmarketSansMedium;
`;
