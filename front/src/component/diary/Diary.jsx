import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LightContainer from "../../publicCompent/LightContainer";
import diaryApi from "../../api/diaryApi";
import { ReactComponent as CloseImg } from "../../assets/xImg.svg";
import defaultImg from "../../assets/defaultImg.svg";
import { ReactComponent as CirclesSvg } from "../../assets/smallThreeCircles.svg";

function Diary({
  existDiary,
  pushBthDay,
  setReduction,
  setChangeState,
  changeState,
  friend,
}) {
  const [lightHeight, setLightHeight] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [imgData, setImgData] = useState("");
  const [presenceOrAbsence, setpresenceOrAbsence] = useState("");
  const [isImg, setIsImg] = useState(false);
  const [showDeleteImg, setShowDeleteImg] = useState(false);

  const onclick = () => {
    setReduction(false);
  };

  useEffect(() => {
    setImgData("");
    setPreviewImg("");
  }, [pushBthDay]);

  useEffect(() => {
    const container = document.getElementById("container");
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setLightHeight(height);
      }
    });
    observer.observe(container);
  }, []);

  useEffect(() => {
    if (existDiary) {
      (async () => {
        const response = await diaryApi.importDiary(pushBthDay);
        document.getElementById("title").value = response.data.title;
        document.getElementById("content").value = response.data.content;
        if (response.data.image) {
          document.getElementById("img").src =
            response.data.image + `?time=${new Date().getTime()}`;
          setpresenceOrAbsence(true);
        } else {
          document.getElementById("img").src = defaultImg;
          setpresenceOrAbsence(false);
        }
        window.localStorage.setItem("diaryNum", response.data.no);
      })();
    }
  }, [pushBthDay]);

  const enrollment = async () => {
    const date = pushBthDay;
    date[1] += 1;

    const fromData = new FormData();
    fromData.append("image", imgData);
    fromData.append(
      "content",
      document.getElementById("enrollmentContent").value
    );
    fromData.append("title", document.getElementById("enrollmentTitle").value);
    fromData.append("date", date.join("-"));
    await diaryApi.enrollmentDiary(fromData, date.join("-"));
    setChangeState(!changeState);
    setReduction(false);
  };

  const update = async () => {
    const date = pushBthDay;
    date[1] += 1;

    const fromData = new FormData();
    fromData.append("image", imgData);
    fromData.append("content", document.getElementById("content").value);
    fromData.append("title", document.getElementById("title").value);
    fromData.append("isImage", isImg);

    await diaryApi.updateDiary(fromData, date.join("-"));
    setChangeState(!changeState);
    setReduction(false);
  };

  const delet = async () => {
    let [year, month, day] = pushBthDay;
    month += 1;
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    await diaryApi.deletDiary({ date: year + "-" + month + "-" + day });
    setChangeState(!changeState);
    setReduction(false);
  };

  const readImg = (e) => {
    const fileReader = new FileReader();
    const data = e.target;
    fileReader.onload = function () {
      const dataURL = fileReader.result;
      setPreviewImg(dataURL);
    };
    fileReader.readAsDataURL(data.files[0]);
    setImgData(data.files[0]);
    setIsImg(true);
    setpresenceOrAbsence(true);
  };

  const deleteImg = () => {
    setIsImg(true);
    setPreviewImg(defaultImg);
    setpresenceOrAbsence(false);
  };

  return (
    <>
      {existDiary ? (
        <div style={{ marginTop: "20px" }}>
          <LightContainer
            tag={
              <Container width={567} height={lightHeight} id={"container"}>
                <CloseSideWindow onClick={onclick}>
                  <Close />
                </CloseSideWindow>
                <TitleTransfrom
                  readOnly={friend}
                  placeholder={"제목을 입력하세요"}
                  id={"title"}
                ></TitleTransfrom>
                <MainTextTransfrom
                  readOnly={friend}
                  placeholder={"내용을 입력하세요"}
                  id={"content"}
                ></MainTextTransfrom>
                <input
                  type={"file"}
                  id={"uploadImg"}
                  style={{ display: "none" }}
                  onChange={readImg}
                />
                {presenceOrAbsence && (
                  <ThreeCircles
                    onMouseOver={() => setShowDeleteImg(true)}
                    onMouseOut={() => setShowDeleteImg(false)}
                  >
                    <Circles />
                    {showDeleteImg && (
                      <State onClick={deleteImg}>이미지 삭제</State>
                    )}
                  </ThreeCircles>
                )}
                <ImgContainer friend={friend}>
                  <label htmlFor="uploadImg">
                    <UploadImg
                      id="img"
                      presenceOrAbsence={presenceOrAbsence}
                      src={previewImg}
                    ></UploadImg>
                  </label>
                </ImgContainer>
                <StateBtnContainer>
                  {!friend && (
                    <>
                      <StateBtn onClick={delet} delet={true}>
                        삭제
                      </StateBtn>
                      <StateBtn
                        onClick={update}
                        style={{ marginRight: "20px" }}
                      >
                        수정
                      </StateBtn>
                    </>
                  )}
                </StateBtnContainer>
              </Container>
            }
          ></LightContainer>
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <LightContainer
            tag={
              <Container width={567} height={lightHeight} id={"container"}>
                <CloseSideWindow onClick={onclick}>
                  <Close />
                </CloseSideWindow>
                <Title
                  placeholder={"제목을 입력하세요"}
                  id={"enrollmentTitle"}
                ></Title>
                <input
                  type={"file"}
                  id={"uploadImg"}
                  style={{ display: "none" }}
                  onChange={readImg}
                  value={""}
                />
                <div
                  style={{ width: "502px", height: "60px", marginTop: "13px" }}
                >
                  <label htmlFor="uploadImg">
                    <UploadImg
                      src={previewImg ? previewImg : defaultImg}
                    ></UploadImg>
                  </label>
                </div>

                <MainText
                  placeholder={"내용을 입력하세요"}
                  id={"enrollmentContent"}
                ></MainText>
                <div
                  style={{
                    width: "502px",
                    height: "30px",
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                  {!friend && <StateBtn onClick={enrollment}>등록</StateBtn>}
                </div>
              </Container>
            }
          ></LightContainer>
        </div>
      )}
    </>
  );
}
export default Diary;

const ImgContainer = styled.div`
  width: 502px;
  margin-top: 13px;
  display: flex;
  justify-content: center;

  pointer-events: ${({ friend }) => friend && "none"};
`;

const StateBtnContainer = styled.div`
  width: 502px;
  height: 30px;
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  background: #e8ebf2 0% 0% no-repeat padding-box;
  box-shadow: 5px 5px 30px #0f296b33;
  border: 0.20000000298023224px solid #ffffff;
  border-radius: 10px;
`;

const MainText = styled.textarea`
  width: 502px;
  min-height: 100px;
  max-height: 363px;

  font: 12px/16px GmarketSansMedium;
  color: #838383;
  padding: 10px;
  border: none;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  outline: none;
  resize: vertical;
`;

const MainTextTransfrom = styled.textarea`
  max-width: 502px;
  min-width: 502px;
  min-height: 100px;
  max-height: 215px;
  margin-top: 9px;
  padding: 10px;

  color: #838383;
  font: 12px/16px SCDream4;
  background-color: transparent;
  border: none;
  outline: none;
  resize: none;
  &:focus {
    max-width: 502px;
    min-width: 502px;
    min-height: 100px;
    max-height: 215px;

    font: 12px/16px SCDream4;
    color: #838383;
    padding: 10px;
    border: none;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    outline: none;
    resize: vertical;
  }
`;

const Title = styled.input`
  width: 502px;
  height: 40px;

  padding-left: 6px;
  font: 15px/22px GmarketSansMedium;
  border: none;
  border-bottom: 1px solid #838383;
  background: transparent;
  color: #838383;
  outline: none;
`;

const TitleTransfrom = styled.input`
  width: 502px;
  height: 40px;

  padding-left: 6px;
  font: 15px/22px GmarketSansMedium;
  border: none;
  border-bottom: 1px solid #838383;
  background: transparent;
  color: #838383;
  outline: none;
`;

const UploadImg = styled.img`
  width: ${({ presenceOrAbsence }) => (presenceOrAbsence ? "500" : "35")}px;
  height: ${({ presenceOrAbsence }) => (presenceOrAbsence ? "200" : "35")}px;
  cursor: pointer;
`;

const StateBtn = styled.div`
  width: 40px;
  height: 22px;
  padding-left: 6px;
  font: 14px/25px GmarketSansMedium;
  color: ${({ delet }) => (delet ? "#FFFFFF" : "#393939")};
  background: ${({ delet }) => (delet ? "#717E9B" : "#cbd2e0")};
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
`;

const CloseSideWindow = styled.div`
  width: 502px;
  height: 30px;
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const ThreeCircles = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: 9;
  left: 45px;
  top: 46%;
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

const Close = styled(CloseImg)`
  cursor: pointer;
`;

const Circles = styled(CirclesSvg)`
  cursor: pointer;
`;
