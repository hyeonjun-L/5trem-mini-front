import React, { useState, useEffect } from "react";
import CalenderBtn from "./CalenderBtn";
import dateCalculation from "../component/mainPage/dateCalculation";
import Diary from "../component/diary/Diary";
import diaryApi from "../api/diaryApi";
import ToDoList from "../component/toDoList/ToDoList";
import toDoListApi from "../api/toDoListApi";
import Friend from "../component/mainPage_Friend/Friend";
import MyPage from "../component/myPage/MyPage";
import holidayApi from "../api/holidayApi";

function Calendar({
  year,
  month,
  reduction,
  setReduction,
  diary,
  friendViewer,
  setFriendViewer,
  refreshFriend,
  setrefreshFriend,
  setMoveFriend,
  moveFriend,
  myPageViewer,
  setMyPageViewer,
}) {
  const monthDate = dateCalculation(year, month - 1);

  const [holiday, setHoliday] = useState([]);

  const [push, setPush] = useState(new Array(42).fill(false));
  const [pushBthDay, setPushBthDay] = useState("");

  const [writtenDiaryBtn, setWrittenDiaryBtn] = useState("");
  const [existDiary, setExistDiary] = useState(false);
  const [changeState, setChangeState] = useState(false);

  const [writtenTodoListBtn, setWrittenTodoListBtn] = useState([]);

  const pushBtn = (index, bthDay) => {
    const pushArr = new Array(42).fill(false);
    pushArr[index] = true;
    setPush(pushArr);
    setPushBthDay(bthDay);
    setFriendViewer(false);
    setMyPageViewer(false);
  };

  const pullBtn = () => {
    const pushArr = new Array(42).fill(false);
    setPush(pushArr);
  };

  const lookUp = () => {
    if (diary) {
      (async () => {
        setWrittenDiaryBtn(await diaryApi.checkDiary(year, month));
      })();
    } else {
      (async () => {
        setWrittenTodoListBtn(await toDoListApi.getToDoListCount(year, month));
      })();
    }
  };

  useEffect(() => {
    (async () => {
      setHoliday(await holidayApi.getHoliday(year, month));
    })();
  }, [year, month]);

  useEffect(() => {
    pullBtn();
    lookUp();
    setReduction(false);
    setFriendViewer(false);
    setMyPageViewer(false);
  }, [year, month, diary, moveFriend]);

  useEffect(() => {
    lookUp();
  }, [changeState]);

  useEffect(() => {
    if (!reduction) {
      pullBtn();
    }
  }, [reduction]);

  useEffect(() => {
    if (friendViewer) {
      pullBtn();
      setReduction(true);
      setMyPageViewer(false);
    }
  }, [friendViewer]);

  useEffect(() => {
    if (myPageViewer) {
      pullBtn();
      setReduction(true);
      setFriendViewer(false);
    }
  }, [myPageViewer]);

  return (
    <>
      {reduction ? (
        <div
          style={{
            display: "flex",
            width: "1450px",
            margin: "0 auto 0",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "800px",
              height: "600px",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {monthDate.map((value, index) => (
              <CalenderBtn
                key={index}
                date={value}
                dayOfTheWeek={index}
                calendarDate={[year, month]}
                pushBtn={pushBtn}
                pullBtn={pullBtn}
                push={push[index]}
                setReduction={setReduction}
                reduction={reduction}
                diary={diary}
                writtenDiaryBtn={writtenDiaryBtn}
                setExistDiary={setExistDiary}
                writtenTodoListBtn={writtenTodoListBtn}
                holiday={holiday}
              />
            ))}
          </div>
          <div
            style={{
              width: "600px",
            }}
          >
            {friendViewer ? (
              <Friend
                refreshFriend={refreshFriend}
                setrefreshFriend={setrefreshFriend}
                setMoveFriend={setMoveFriend}
              />
            ) : myPageViewer ? (
              <MyPage></MyPage>
            ) : diary ? (
              <>
                <Diary
                  pushBthDay={pushBthDay}
                  existDiary={existDiary}
                  setReduction={setReduction}
                  setChangeState={setChangeState}
                  changeState={changeState}
                  friend={moveFriend.friendVisit}
                />
              </>
            ) : (
              <ToDoList
                pushBthDay={pushBthDay}
                changeState={changeState}
                setChangeState={setChangeState}
                friend={moveFriend.friendVisit}
              />
            )}
          </div>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              width: "1000px",
              margin: "0 auto 0",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {monthDate.map((value, index) => (
              <CalenderBtn
                key={index}
                date={value}
                dayOfTheWeek={index}
                calendarDate={[year, month]}
                pushBtn={pushBtn}
                pullBtn={pullBtn}
                push={push[index]}
                setReduction={setReduction}
                reduction={reduction}
                diary={diary}
                writtenDiaryBtn={writtenDiaryBtn}
                setExistDiary={setExistDiary}
                writtenTodoListBtn={writtenTodoListBtn}
                holiday={holiday}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Calendar;
