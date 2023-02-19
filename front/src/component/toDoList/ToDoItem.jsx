import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import styled from "styled-components";
import { ReactComponent as CheckImg } from "../../assets/todoCheck.svg";
import { ReactComponent as NoneCheckImg } from "../../assets/todoNoneCheck.svg";
import { ReactComponent as XImg } from "../../assets/todoXImg.svg";
import { ReactComponent as LikeImg } from "../../assets/heart.svg";
import { ReactComponent as FilledLikeImg } from "../../assets/filledheart.svg";
import toDoListApi from "../../api/toDoListApi";

function ToDoItem({ todo, setChangeState, changeState, friend }) {
  const [check, setCheck] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);
  const [hasLike, setHasLike] = useState(false);
  const [likeCheck, setLikeCheck] = useState(false);
  const todoNo = todo.no;

  useEffect(() => {
    setCheck(Boolean(todo.is_checked));
    setHasLike(Boolean(todo.likesCnt));
    setLikeCheck(todo.likeChecked);
  }, []);

  const debounceUpdate = debounce(async (e) => {
    if (e.target.id === "title") {
      const data = {
        todoNo,
        title: e.target.value,
        content: content,
      };
      setTitle(e.target.value);
      await toDoListApi.updateToDoList(data);
    } else {
      const data = {
        todoNo,
        title: title,
        content: e.target.value,
      };
      setContent(e.target.value);
      await toDoListApi.updateToDoList(data);
    }
  }, 500);

  const deleteToDoList = async () => {
    const data = {
      todoNo,
    };
    const success = await toDoListApi.delToDoList(data);
    if (success) {
      setChangeState(!changeState);
    }
  };

  const checkChange = async () => {
    const data = {
      todoNo,
      is_checked: check ? 0 : 1,
    };
    const success = await toDoListApi.checkToDoList(data);
    if (success) {
      setCheck(!check);
    }
  };

  const addLike = async () => {
    const data = {
      todo_no: todo.no,
      id: localStorage.getItem("myID"),
    };
    const success = await toDoListApi.addToDoLike(data);
    if (success) {
      setChangeState(!changeState);
      setHasLike(true);
      setLikeCheck(true);
    }
  };

  const subLike = async () => {
    const data = {
      todo_no: todo.no,
      id: localStorage.getItem("myID"),
    };
    const success = await toDoListApi.subToDoLike(data);
    if (success) {
      setChangeState(!changeState);
      setLikeCheck(false);
      if (todo.likesCnt === 1) {
        setHasLike(false);
      }
    }
  };

  return (
    <div>
      <StateBtn>
        {!friend && !check && <NoneCheck onClick={checkChange} />}
        {!friend && check && <Check onClick={checkChange} />}
        {!friend && <Delete onClick={deleteToDoList} />}
        {hasLike ? (
          likeCheck ? (
            <FilledLike onClick={subLike} />
          ) : (
            <FilledLike onClick={addLike} />
          )
        ) : (
          <Like onClick={addLike} />
        )}
        {hasLike && <LikeCnt>{todo.likesCnt}</LikeCnt>}
      </StateBtn>
      <ToDoItemContainer>
        <Title
          check={check}
          defaultValue={title}
          onChange={debounceUpdate}
          id="title"
          readOnly={friend}
        ></Title>
        <Content
          check={check}
          defaultValue={content}
          onChange={debounceUpdate}
          id="content"
          readOnly={friend}
        ></Content>
      </ToDoItemContainer>
    </div>
  );
}

export default ToDoItem;

const ToDoItemContainer = styled.div`
  width: 537px;
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const StateBtn = styled.div`
  width: 20px;
  height: 60px;

  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.input`
  width: 502px;

  padding-left: 6px;
  font: 30px/35px GmarketSansMedium;
  border: none;
  background: transparent;
  outline: none;
  color: ${({ check }) => (check ? "#919191" : "#393939")};
  text-decoration: ${({ check }) => check && "line-through"};
`;

const Content = styled.textarea`
  width: 502px;
  height: 40px;
  margin: 5px 0 5px 6px;

  font: 15px/17px SCDream4;
  border: none;
  background: transparent;
  outline: none;
  resize: none;
  color: ${({ check }) => (check ? "#838383" : "#393939")};
  text-decoration: ${({ check }) => check && "line-through"};
`;

const LikeCnt = styled.span`
  width: 13px;
  height: 8px;
  font: 9px/10px GmarketSansMedium;
  color: #393939;
  text-align: center;
  user-select: none;
`;

const Check = styled(CheckImg)`
  cursor: pointer;
`;

const NoneCheck = styled(NoneCheckImg)`
  cursor: pointer;
`;
const Delete = styled(XImg)`
  cursor: pointer;
`;
const Like = styled(LikeImg)`
  cursor: pointer;
`;
const FilledLike = styled(FilledLikeImg)`
  cursor: pointer;
`;
