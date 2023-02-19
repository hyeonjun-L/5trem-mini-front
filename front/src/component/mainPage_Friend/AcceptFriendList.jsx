import React, { useState, useEffect } from "react";
import styled from "styled-components";
import friendApi from "../../api/friendApi";

function AcceptFriendList({
  refreshFriend,
  friendUserInfo,
  setrefreshFriend,
  index,
}) {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);

  const accept = async (connectionNum) => {
    if (await friendApi.acceptFriend({ no: connectionNum })) {
      setrefreshFriend(!refreshFriend);
    }
  };

  const refuse = async (connectionNum) => {
    const data = { no: connectionNum };
    if (await friendApi.refuseFriend(data)) {
      setrefreshFriend(!refreshFriend);
    }
  };

  useEffect(() => {
    if (document.getElementById(index + "NickName").offsetWidth >= 115) {
      setShow(true);
    }
  }, []);

  return (
    <>
      <Container>
        <FriendNickName
          id={index + "NickName"}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          {show && hover && <State> {friendUserInfo.nickname}</State>}
          {friendUserInfo.nickname}
        </FriendNickName>
        <Introduction>님이 친구를 신청했습니다.</Introduction>
      </Container>
      <StateBtnContainer>
        <AcceptBtn onClick={() => accept(friendUserInfo.list_no)}>
          수락
        </AcceptBtn>
        <RefuseBtn onClick={() => refuse(friendUserInfo.list_no)}>
          거절
        </RefuseBtn>
      </StateBtnContainer>
    </>
  );
}
export default AcceptFriendList;

const Container = styled.div`
  position: relative;
  width: 320px;
  height: 20px;
  display: flex;
  padding: 0 10px 0 8px;
  margin-top: 13px;
`;

const FriendNickName = styled.div`
  max-width: 115px;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font: 15px/17px GmarketSansMedium;
  color: #5f5f5f;
`;

const Introduction = styled.div`
  font: 12px/14px GmarketSansMedium;
  color: #838383;
  margin-left: 6px;
  margin-top: 2px;
`;

const StateBtnContainer = styled.div`
  width: 100px;
  height: 20px;
  display: flex;
  justify-content: space-around;
  margin: 11px 5px 0 0;
`;

const AcceptBtn = styled.div`
  font: 13px/22px GmarketSansMedium;
  width: 42px;
  height: 19px;
  color: #ffffff;
  background: #717e9b;
  border-radius: 4px;
  padding-left: 8px;
  user-select: none;
  cursor: pointer;
`;

const RefuseBtn = styled.div`
  font: 13px/22px GmarketSansMedium;
  width: 42px;
  height: 19px;
  color: #393939;
  background: #bec5d5;
  border-radius: 4px;
  padding-left: 8px;
  user-select: none;
  cursor: pointer;
`;

const State = styled.div`
  position: absolute;
  height: 39px;
  left: -125px;
  top: -35px;

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
