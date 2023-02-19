import { useState, useEffect } from "react";
import styled from "styled-components";
import ViewMore from "../component/mainPage/ViewMore";

function SelectUl({
  children,
  month,
  setMonth,
  selectList,
  setSelectList,
  firend,
  setFriendViewer,
  setMoveFriend,
}) {
  const movefriend = (friend) => {
    setMoveFriend({
      friendNickName: friend.nickname,
      friendVisit: true,
    });
    localStorage.setItem("userID", friend.id);
  };

  const [show, setShow] = useState(false);
  const toggleUl = () => {
    setShow((prev) => !prev);
  };

  const conversion = (e) => {
    selectList = selectList
      .map((Element) => {
        return Element !== e.target.textContent ? Element : month;
      })
      .sort((a, b) => a - b);

    setSelectList(selectList);
    setMonth(e.target.textContent);
  };

  return (
    <div>
      {firend ? (
        <SelectBtn
          onMouseOver={() => setShow(true)}
          onMouseOut={() => setShow(false)}
        >
          {children}
          {show && (
            <SelectList firend={firend}>
              <ViewMore setFriendViewer={setFriendViewer} />
              {selectList.map((friend, index) => (
                <SelectItem key={index} onClick={() => movefriend(friend)}>
                  <PersonImg src={friend.image_url} />
                  <NickNameOver>{friend.nickname}</NickNameOver>
                </SelectItem>
              ))}
              <div style={{ paddingBottom: "15px" }}></div>
            </SelectList>
          )}
        </SelectBtn>
      ) : (
        <SelectBtn onClick={toggleUl} onBlur={() => setShow(false)}>
          {children}
          {show && (
            <SelectList firend={firend}>
              {selectList.map((value, index) => (
                <SelectItem
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={conversion}
                  key={index}
                >
                  {value}
                </SelectItem>
              ))}
              <div style={{ paddingBottom: "15px" }}></div>
            </SelectList>
          )}
        </SelectBtn>
      )}
    </div>
  );
}

const SelectBtn = styled.div`
  position: relative;
`;

const SelectList = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: ${({ firend }) => (firend ? "" : "81")}px;
  left: ${({ firend }) => (firend ? "-45" : "-55")}px;

  background: rgb(115 115 115 / 75%);
  box-shadow: inset 5px 5px 20px #000000a3, 7px 7px 15px #0000009e;
  backdrop-filter: blur(2px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 99;
`;

const SelectItem = styled.li`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  font: 15px Gmarket Sans;
  color: #ffffff;
  user-select: none;
  cursor: pointer;
`;

const NickNameOver = styled.div`
  width: 121px;
  height: 20px;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PersonImg = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 70%;
  margin-right: 3px;
`;

export default SelectUl;
