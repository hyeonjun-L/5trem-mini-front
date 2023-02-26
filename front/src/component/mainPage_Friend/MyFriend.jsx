import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useCarousel from "./useCarousel";
import HoverBtn from "../../publicCompent/HoverBtn";
import friendApi from "../../api/friendApi";
import { ReactComponent as ThreeCircles } from "../../assets/smallThreeCircles.svg";

function MyFriend({ refreshFriend, setrefreshFriend, setMoveFriend }) {
  const [friendList, setFriendList] = useState([]);
  const [stateHover, setStateHover] = useState(false);

  const movefriend = (friend) => {
    setMoveFriend({
      friendNickName: friend.nickname,
      friendVisit: true,
    });
    localStorage.setItem("userID", friend.id);
  };

  const showDelete = (index) => {
    const arr = new Array(friendList.length).fill(false);
    arr[index] = true;
    setStateHover(arr);
  };
  const noneShowDelete = () => {
    const arr = new Array(friendList.length).fill(false);
    setStateHover(arr);
  };

  const refuseFriend = async (friend) => {
    const data = { no: friend.friendListNo };
    const response = await friendApi.refuseFriend(data);
    if (response.success) {
      setrefreshFriend(!refreshFriend);
    }
  };

  useEffect(() => {
    (async () => {
      setFriendList(await friendApi.getFriendList());
    })();
  }, [refreshFriend]);

  const carousel = useCarousel(friendList);
  const move = carousel.carouselArr[carousel.carouselIndex];
  return (
    <MyFriendContainer>
      <div
        style={{
          width: "200px",
          height: "30px",
          textAlign: "center",
        }}
      >
        내 친구
      </div>
      <Absolute left={true}>
        <HoverBtn set={carousel.subCarouselIndex} left={true} />
      </Absolute>
      <Absolute right={true}>
        <HoverBtn set={carousel.addCarouselIndex} />
      </Absolute>
      <FriendContainer>
        {friendList.map((friend, i) => {
          return (
            <FriendInfo
              key={i}
              animate={{ x: move }}
              transition={{
                duration: 0.3,
              }}
            >
              <DeleteContainer
                onMouseOver={() => showDelete(i)}
                onMouseOut={() => noneShowDelete(i)}
              >
                {stateHover[i] && (
                  <State onClick={() => refuseFriend(friend)}>삭제</State>
                )}
                <ThreeCircles />
              </DeleteContainer>
              <FriendImg
                src={friend.image_url}
                onClick={() => movefriend(friend)}
              ></FriendImg>
              <FriendName onClick={() => movefriend(friend)}>
                {friend.nickname}
              </FriendName>
            </FriendInfo>
          );
        })}
      </FriendContainer>
    </MyFriendContainer>
  );
}

export default MyFriend;

const MyFriendContainer = styled.div`
  width: 520px;
  height: 275px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;

  padding: 40px 0 36px 0;
  margin-top: 39px;
  background: #d0d6e3;
  border-radius: 30px;

  font: 25px/29px GmarketSansMedium;
`;

const FriendContainer = styled.div`
  width: 440px;
  height: 175px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`;

const FriendInfo = styled(motion.div)`
  position: relative;
  width: 90px;
  height: 84px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  transform: ${({ move }) => `translateX(${move}px)`};
  user-select: none;
  cursor: pointer;
`;

const FriendImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  margin-right: 20px;
  background-color: white;
`;

const FriendName = styled.div`
  width: 100px;
  margin-right: 20px;
  font: 12px/14px GmarketSansMedium;
  color: #5d5d5d;

  text-align: center;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Absolute = styled.span`
  position: absolute;
  left: ${({ left }) => left && 2}px;
  right: ${({ right }) => right && 2}px;
  top: 180px;
`;

const DeleteContainer = styled.span`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 0px;
  top: -9px;
`;

const State = styled.div`
  position: absolute;
  width: 55px;
  height: 28px;
  left: 2px;
  top: -28px;

  background: rgb(115 115 115 / 75%);
  box-shadow: inset 5px 5px 20px #222222a2, 7px 7px 15px #0000009e;
  backdrop-filter: blur(2px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 99;

  user-select: none;
  cursor: pointer;
  text-align: center;
  padding-top: 6px;
  color: #ffffff;
  font: 14px/18px GmarketSansMedium;
`;
