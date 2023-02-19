import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LightContainer from "../../publicCompent/LightContainer";
import ToDoItem from "./ToDoItem";
import Comment from "./Comment";
import toDoListApi from "../../api/toDoListApi";
import commentApi from "../../api/commentApi";
import { ReactComponent as ShowImg } from "../../assets/produceImg.svg";
import { ReactComponent as CloseImg } from "../../assets/xImg.svg";

function ToDoList({ pushBthDay, changeState, setChangeState, friend }) {
  const BthDay =
    pushBthDay[0] + "-" + (pushBthDay[1] + 1) + "-" + pushBthDay[2];
  const [show, setShow] = useState(false);
  const [toDoList, setToDoList] = useState([]);

  const [haveComment, setHaveComment] = useState(false);
  const [comment, setComment] = useState([]);
  const [changeComment, setChangeComment] = useState(false);

  useEffect(() => {
    (async () => {
      setToDoList(await toDoListApi.getToDoList(BthDay));
    })();
  }, [pushBthDay, changeState]);

  useEffect(() => {
    (async () => {
      const response = await commentApi.getToDoListComment(BthDay);
      setHaveComment(response.length !== 0);
      setComment(response);
    })();
  }, [pushBthDay, changeComment]);

  const enrollmentToDoList = async () => {
    const data = {
      id: localStorage.getItem("userID"),
      date: BthDay,
      title: document.getElementById("addTitle").value,
      content: document.getElementById("addContent").value,
    };
    const success = await toDoListApi.addToDoList(data);
    if (success) {
      document.getElementById("addTitle").value = "";
      document.getElementById("addContent").value = "";
      setChangeState(!changeState);
    }
  };

  const enrollmentComment = async () => {
    const data = {
      user_id: localStorage.getItem("userID"),
      writer_id: localStorage.getItem("myID"),
      date: BthDay,
      content: document.getElementById("comment").value,
    };
    const success = await commentApi.addToDoListComment(data);
    if (success) {
      document.getElementById("comment").value = "";
      setChangeComment(!changeComment);
    }
  };

  return (
    <div
      style={{
        width: "560px",
        marginTop: "20px",
      }}
    >
      {toDoList.map((todo) => {
        return (
          <ToDoItem
            key={todo.no}
            todo={todo}
            changeState={changeState}
            setChangeState={setChangeState}
            friend={friend}
          />
        );
      })}
      {!friend && !show && <ShowEnrollmentBtn onClick={() => setShow(true)} />}
      {show && (
        <LightContainer
          tag={
            <TodoListEnrollment width={550} height={212} id={"container"}>
              <RightSort>
                <CloseEnrollmentBtn onClick={() => setShow(false)} />
              </RightSort>
              <Title placeholder={"제목을 입력하세요"} id="addTitle"></Title>
              <Content
                placeholder={"내용을 입력하세요"}
                id="addContent"
              ></Content>
              <RightSort style={{ margin: "12px 0px 7px 0px" }}>
                <StateBtn onClick={enrollmentToDoList}>등록</StateBtn>
              </RightSort>
            </TodoListEnrollment>
          }
        ></LightContainer>
      )}
      <Comment
        haveComment={haveComment}
        comment={comment}
        enrollmentComment={enrollmentComment}
        setChangeComment={setChangeComment}
        changeComment={changeComment}
      />
    </div>
  );
}

export default ToDoList;

const TodoListEnrollment = styled.div`
  width: 557px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  background: linear-gradient(107deg, #e8ebf2 0%, #e8ebf2 0%, #f2f3f7 100%);
  box-shadow: 5px 5px 30px #0f296b33;
  border: 0.20000000298023224px solid #ffffff;
  border-radius: 10px;
`;

const RightSort = styled.div`
  width: 510px;
  height: 34px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const Title = styled.input`
  width: 502px;
  height: 34px;

  padding-left: 6px;
  font: 15px/17px GmarketSansMedium;
  border: none;
  background: transparent;
  color: #838383;
  outline: none;
`;

const Content = styled.textarea`
  width: 502px;
  height: 80px;
  margin-top: 10px;

  font: 11px/16px SCDream4;
  color: #838383;
  padding: 10px;
  border: none;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 10px;
  outline: none;
  resize: none;
`;

const StateBtn = styled.div`
  width: 40px;
  height: 22px;
  padding-left: 6px;
  font: 14px/25px GmarketSansMedium;
  color: #393939;
  background: #cbd2e0;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
`;

const ShowEnrollmentBtn = styled(ShowImg)`
  cursor: pointer;
`;

const CloseEnrollmentBtn = styled(CloseImg)`
  cursor: pointer;
`;
