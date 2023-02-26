import React, { useState, useEffect } from "react";
import styled from "styled-components";
import commentApi from "../../api/commentApi";
import { ReactComponent as CirclesImg } from "../../assets/circles.svg";
import { ReactComponent as SettingImg } from "../../assets/threeCircles.svg";

function CommentList({
  comment,
  index,
  update,
  showUpdate,
  setChangeComment,
  changeComment,
}) {
  const [hover, setHover] = useState(false);

  const openUpdateBtn = () => {
    showUpdate(index);
    document.getElementById("LiftComment" + index).focus();
  };

  const updateComment = async () => {
    const data = {
      cmtNo: comment.no,
      content: document.getElementById("LiftComment" + index).value,
    };
    const succes = await commentApi.updateToDoListComment(data);
    if (succes) {
      showUpdate();
      setChangeComment(!changeComment);
    }
  };

  const deleteComment = async () => {
    const data = {
      cmtNo: comment.no,
    };
    const succes = await commentApi.deleteToDoListComment(data);
    if (succes) {
      setChangeComment(!changeComment);
    }
  };

  return (
    <LiftCommentContainer>
      {localStorage.getItem("myID") === comment.writer_id && (
        <Setting
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          {hover && (
            <StateHover>
              <State onClick={openUpdateBtn}>수정</State>
              <State onClick={deleteComment}>삭제</State>
            </StateHover>
          )}
          <SettingImg />
        </Setting>
      )}
      <CirclesImg />
      <Name>{comment.writer}</Name>
      <LiftComment
        id={"LiftComment" + index}
        defaultValue={comment.content}
        readOnly={!update[index]}
      ></LiftComment>
      {update[index] && <UpdateBtn onClick={updateComment}>수정</UpdateBtn>}
    </LiftCommentContainer>
  );
}

export default CommentList;

const LiftCommentContainer = styled.div`
  width: 480px;
  display: flex;
  margin: 10px 0 10px 0;
  position: relative;
`;

const Name = styled.div`
  width: 55px;
  margin-right: 8px;
  padding-top: 3px;
  text-align: center;

  font: 13px/14px GmarketSansMedium;
  color: #080808;
`;

const LiftComment = styled.input`
  width: 420px;
  padding-top: 3px;
  font: 12px/14px GmarketSansMedium;
  color: #838383;

  border: none;
  background: transparent;
  outline: none;
`;

const Setting = styled.span`
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  width: 50px;
  height: 30px;
  left: -62px;
  top: 2px;
`;

const StateHover = styled.span`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 66px;
  height: 69px;
  left: -28px;
  top: -2px;

  background: rgb(115 115 115 / 75%);
  box-shadow: inset 5px 5px 20px #222222a2, 7px 7px 15px #0000009e;
  backdrop-filter: blur(2px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 99;

  padding: 6px 0 6px 0;
  color: #ffffff;
  font: 15px/18px GmarketSansMedium;
`;

const State = styled.span`
  user-select: none;
  cursor: pointer;
`;

const UpdateBtn = styled.span`
  position: absolute;
  width: 40px;
  height: 22px;
  right: -15px;
  top: -2px;

  padding-left: 6px;
  font: 14px/25px GmarketSansMedium;
  color: #393939;
  background: #cbd2e0;
  border-radius: 4px;

  user-select: none;
  cursor: pointer;
`;
