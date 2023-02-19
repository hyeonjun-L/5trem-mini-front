import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LightContainer from "../../publicCompent/LightContainer";
import CommentList from "./CommentList";

function Comment({
  haveComment,
  comment,
  enrollmentComment,
  changeComment,
  setChangeComment,
}) {
  const [lightHeight, setLightHeight] = useState("");

  const [update, setUpdate] = useState(false);
  const showUpdate = (index) => {
    const arr = new Array(comment.length).fill(false);
    arr[index] = true;
    setUpdate(arr);
  };

  useEffect(() => {
    if (haveComment) {
      const container = document.getElementById("container");
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setLightHeight(height);
        }
      });
      observer.observe(container);
    }
    setUpdate(new Array(comment.length).fill(false));
  }, []);

  return (
    <div style={{ marginTop: "70px" }}>
      {haveComment ? (
        <LightContainer
          tag={
            <CommentContainer width={567} height={lightHeight} id={"container"}>
              <CommentInput2
                id="comment"
                placeholder={"댓글을 입력하세요"}
              ></CommentInput2>
              <StateBtn2 onClick={enrollmentComment}>등록</StateBtn2>
              {comment.map((value, index) => {
                return (
                  <CommentList
                    comment={value}
                    index={index}
                    key={value.no}
                    update={update}
                    showUpdate={showUpdate}
                    setChangeComment={setChangeComment}
                    changeComment={changeComment}
                  />
                );
              })}
            </CommentContainer>
          }
        />
      ) : (
        <LightContainer
          tag={
            <div width={567} height={70}>
              <CommentInput
                id="comment"
                placeholder={"댓글을 입력하세요"}
              ></CommentInput>
              <StateBtn onClick={enrollmentComment}>등록</StateBtn>
            </div>
          }
        />
      )}
    </div>
  );
}

export default Comment;

const CommentInput = styled.input`
  width: 557px;
  height: 60px;

  font: 13px/21px SCDream4;
  color: #838383;

  padding: 0 80px 0 33px;
  border: none;
  outline: none;
  background: linear-gradient(96deg, #e8ebf2 0%, #e8ebf2 0%, #f2f3f7 100%);
  box-shadow: 5px 5px 30px #0f296b33;
  border: 0.2px solid #ffffff;
  border-radius: 10px;
`;

const StateBtn = styled.span`
  position: absolute;

  width: 40px;
  height: 22px;
  right: 24px;
  bottom: 17px;
  padding-left: 6px;
  font: 14px/25px GmarketSansMedium;
  color: #393939;
  background: #cbd2e0;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
`;

const CommentContainer = styled.div`
  width: 557px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  background: linear-gradient(103deg, #e8ebf2 0%, #e8ebf2 0%, #f2f3f7 100%);
  box-shadow: 5px 5px 30px #0f296b33;
  border: 0.2px solid #ffffff;
  border-radius: 10px;
`;

const CommentInput2 = styled.input`
  width: 502px;
  height: 40px;

  margin-top: 20px;
  padding: 0 65px 0 6px;
  font: 15px/21px SCDream4;
  border: none;
  border-bottom: 1px solid #838383;
  background: transparent;
  color: #838383;
  outline: none;
`;

const StateBtn2 = styled.span`
  position: absolute;

  width: 40px;
  height: 22px;
  right: 24px;
  top: 30px;
  padding-left: 6px;
  font: 14px/25px GmarketSansMedium;
  color: #393939;
  background: #cbd2e0;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
`;
