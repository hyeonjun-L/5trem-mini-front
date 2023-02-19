import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SelectMonth from "./SelectMonth";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as HomeImg } from "../../assets/home.svg";
import LightContainer from "../../publicCompent/LightContainer";
import MainTopRight from "./MainTopRight";
import { useNavigate, useLocation } from "react-router-dom";
import HoverBtn from "../../publicCompent/HoverBtn";

function MainTop({
  year,
  increaseYear,
  decreaseYear,
  month,
  setMonth,
  setYear,
  refreshFriend,
  friendViewer,
  setFriendViewer,
  moveFriend,
  setMoveFriend,
  myPageViewer,
  setMyPageViewer,
}) {
  const location = useLocation();
  const url = location.pathname;
  const [hover, setHover] = useState(false);
  const [show, setShow] = useState(false);

  const moveMyPage = () => {
    setMoveFriend({
      friendNickName: "",
      friendVisit: false,
    });
  };

  useEffect(() => {
    if (location.state !== null) {
      const yearChange = Number(location.state.year);
      setYear(yearChange);
    }
  }, []);

  useEffect(() => {
    if (moveFriend.friendVisit) {
      setShow(document.getElementById("friendNickName").offsetWidth >= 271);
    }
  }, [moveFriend]);

  const navigate = useNavigate();
  const moveYearChange = () => {
    navigate("/yearchange", { state: { year, url } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "1300px",
          margin: "50px auto 0",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div style={{ display: "flex" }}>
          <HoverBtn set={decreaseYear} left={true} />
          <Year
            style={{ width: "165px", height: "80px", paddingTop: "11px" }}
            onClick={moveYearChange}
          >
            {year}
          </Year>
          <HoverBtn set={increaseYear} />
          <SelectMonth month={month} setMonth={setMonth}>
            <LightContainer
              tag={
                <MonthBtn style={{ paddingTop: "5px" }} width={40} height={40}>
                  <Arrow />
                </MonthBtn>
              }
            />
          </SelectMonth>
        </div>
        {show && hover && <State>{moveFriend.friendNickName}</State>}
        {moveFriend.friendVisit && (
          <FriendPageContainer>
            <FriendNickName
              id="friendNickName"
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              {moveFriend.friendNickName}
            </FriendNickName>
            <FriendGreetings>님의 페이지입니다.</FriendGreetings>
            <Home onClick={moveMyPage} />
          </FriendPageContainer>
        )}
        <MainTopRight
          friendViewer={friendViewer}
          setFriendViewer={setFriendViewer}
          refreshFriend={refreshFriend}
          setMoveFriend={setMoveFriend}
          myPageViewer={myPageViewer}
          setMyPageViewer={setMyPageViewer}
        />
      </div>
    </div>
  );
}

const MonthBtn = styled.button`
  width: 30px;
  height: 30px;

  background: linear-gradient(135deg, #e8ebf2 0%, #f2f3f7 100%);
  box-shadow: 3px 3px 10px #0f296b33;
  border: 0.20000000298023224px solid #ffffff;
  border-radius: 5px;
  cursor: pointer;
`;

const Year = styled.div`
  font-size: 60px;
  font-family: GmarketSansBold;
  color: #393939;
  user-select: none;
  cursor: pointer;
`;

const FriendPageContainer = styled.div`
  height: 50px;
  margin-top: 30px;
  display: flex;
  right: 430px;
  position: absolute;
`;

const FriendNickName = styled.div`
  max-width: 271px;
  height: 80px;
  font: 30px/18px GmarketSansBold;
  color: #707070;
  padding-top: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;

const FriendGreetings = styled.div`
  font: 15px/18px GmarketSansMedium;
  color: #707070;
  margin: 21px 0 0 3px;
  user-select: none;
`;

const State = styled.div`
  position: absolute;
  height: 39px;
  right: 600px;
  top: -8px;

  background: rgb(115 115 115 / 75%);
  box-shadow: inset 5px 5px 20px #222222a2, 7px 7px 15px #0000009e;
  backdrop-filter: blur(2px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 99;

  text-align: center;
  padding: 11px 15px 13px 15px;
  color: #ffffff;
  font: 15px/18px GmarketSansMedium;
`;

const Home = styled(HomeImg)`
  margin-top: 3px;
  cursor: pointer;
`;

export default MainTop;
