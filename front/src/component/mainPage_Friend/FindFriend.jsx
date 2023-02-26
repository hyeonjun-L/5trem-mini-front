import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LightContainer from "../../publicCompent/LightContainer";
import { ReactComponent as ReadGlass } from "../../assets/readGlass.svg";
import { debounce } from "lodash";
import friendApi from "../../api/friendApi";

function FindFriend({ refreshFriend, setrefreshFriend }) {
  const [show, setShow] = useState(false);
  const [friendInfo, setFriendInfo] = useState("");

  const findFriend = debounce(async (e) => {
    const response = await friendApi.getFriendSearch(e.target.value);
    setFriendInfo(response);
    setShow(response.success);
  }, 500);

  const managementFriend = async () => {
    if (friendInfo.listNo) {
      const data = { no: friendInfo.listNo };
      const response = await friendApi.refuseFriend(data);
      if (response.success) {
        setShow(false);
        setrefreshFriend(!refreshFriend);
        document.getElementById("findInput").value = "";
      }
    } else {
      const data = {
        senderId: localStorage.getItem("myID"),
        receiverNickname: friendInfo.nickname,
      };
      const response = await friendApi.requestFriend(data);
      if (response.success) {
        setShow(false);
        document.getElementById("findInput").value = "";
      }
    }
  };

  return (
    <>
      <LightContainer
        tag={
          <div width={456} height={70}>
            <FindeFriendInput
              onChange={findFriend}
              placeholder={"닉네임을 검색하세요"}
              id={"findInput"}
            />
            <FindeImg>
              <ReadGlass />
            </FindeImg>
          </div>
        }
      ></LightContainer>
      <FinedResultContainer>
        {show && (
          <>
            <FriendImg src={friendInfo.image_url}></FriendImg>
            <FriendName>{friendInfo.nickname}</FriendName>
            <LightContainer
              tag={
                <AddFriendBtn
                  onClick={managementFriend}
                  width={100}
                  height={40}
                >
                  {Boolean(friendInfo.listNo) ? "친구삭제" : "친구신청"}
                </AddFriendBtn>
              }
            ></LightContainer>
          </>
        )}
      </FinedResultContainer>
    </>
  );
}

export default FindFriend;

const FindeFriendInput = styled.input`
  width: 446px;
  height: 60px;

  font: 15px/17px GmarketSansMedium;
  color: #838383;

  padding: 0 80px 0 33px;
  border: none;
  outline: none;
  background: linear-gradient(97deg, #e8ebf2 0%, #e8ebf2 0%, #f2f3f7 100%);
  box-shadow: 5px 5px 30px #0f296b33;
  border: 0.2px solid #ffffff;
  border-radius: 10px;
`;

const FindeImg = styled.span`
  position: absolute;

  right: 30px;
  bottom: 17px;
`;

const FinedResultContainer = styled.div`
  width: 200px;
  height: 185px;
  margin-top: 49px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FriendImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const FriendName = styled.div`
  margin: 15px 0 5px 0;
  font: 20px/23px GmarketSansBold;
  color: #5f5f5f;
`;

const AddFriendBtn = styled.button`
  width: 95px;
  height: 30px;

  font: 15px/17px GmarketSansMedium;
  color: #393939;
  background: linear-gradient(107deg, #e8ebf2 0%, #b8c0d1 0%, #d9deeb 100%);
  box-shadow: 5px 5px 10px #0f296b66;
  border: none;
  border-radius: 7px;
  user-select: none;
  cursor: pointer;
`;
