import React from "react";
import styled from "styled-components";
import SelectFriend from "../../component/mainPage_Friend/SelectFriend";
import { useNavigate } from "react-router-dom";

function MainTopRight({
  friendViewer,
  setFriendViewer,
  refreshFriend,
  setMoveFriend,
  myPageViewer,
  setMyPageViewer,
}) {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem("userID", "");
    localStorage.setItem("myID", "");

    navigate("/login");
  };

  return (
    <div style={{ display: "flex", height: "80px", alignItems: "flex-end" }}>
      <SelectFriend
        setFriendViewer={setFriendViewer}
        refreshFriend={refreshFriend}
        setMoveFriend={setMoveFriend}
      >
        <StyleTextBtn viewer={friendViewer} noClick={true}>
          친구
        </StyleTextBtn>
      </SelectFriend>
      <StyleTextBtn viewer={myPageViewer} onClick={() => setMyPageViewer(true)}>
        마이페이지
      </StyleTextBtn>
      <StyleTextBtn onClick={logOut}>로그아웃</StyleTextBtn>
    </div>
  );
}

export default MainTopRight;

const StyleTextBtn = styled.div`
  letter-spacing: 0px;
  font-family: ${({ viewer }) =>
    viewer ? "GmarketSansBold" : "GmarketSansMedium"};
  padding: 10px 21px;
  font-size: 25px;
  color: #707070;
  user-select: none;
  cursor: ${({ noClick }) => (noClick ? null : "pointer")};
`;
