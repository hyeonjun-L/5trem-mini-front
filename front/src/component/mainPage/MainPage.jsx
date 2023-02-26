import React, { useState, useEffect } from "react";
import MainTop from "./MainTop";
import useYearCounter from "./useYearCounter";
import TransfromBtn from "./TransfromBtn";
import Calendar from "../../publicCompent/Calendar";

function MainPage() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [year, increaseYear, decreaseYear, setYear] =
    useYearCounter(currentYear);
  const [month, setMonth] = useState(
    currentMonth >= 10 ? currentMonth : "0" + currentMonth
  );

  const [reduction, setReduction] = useState(false);
  const [diary, setDiary] = useState(false);

  const [refreshFriend, setrefreshFriend] = useState(false);
  const [friendViewer, setFriendViewer] = useState(false);
  const [moveFriend, setMoveFriend] = useState({
    friendNickName: "",
    friendVisit: false,
  });

  const [myPageViewer, setMyPageViewer] = useState(false);

  if (!moveFriend.friendVisit) {
    localStorage.setItem("userID", localStorage.getItem("myID"));
  }

  return (
    <>
      <MainTop
        year={year}
        month={month}
        setMonth={setMonth}
        increaseYear={increaseYear}
        decreaseYear={decreaseYear}
        refreshFriend={refreshFriend}
        setYear={setYear}
        friendViewer={friendViewer}
        setFriendViewer={setFriendViewer}
        myPageViewer={myPageViewer}
        setMyPageViewer={setMyPageViewer}
        moveFriend={moveFriend}
        setMoveFriend={setMoveFriend}
      />
      <TransfromBtn
        reduction={reduction}
        diary={diary}
        setReduction={setReduction}
        setDiary={setDiary}
        friendViewer={friendViewer}
        setFriendViewer={setFriendViewer}
        myPageViewer={myPageViewer}
        setMyPageViewer={setMyPageViewer}
      />
      <Calendar
        diary={diary}
        reduction={reduction}
        setReduction={setReduction}
        year={year}
        month={month}
        friendViewer={friendViewer}
        setFriendViewer={setFriendViewer}
        refreshFriend={refreshFriend}
        setrefreshFriend={setrefreshFriend}
        moveFriend={moveFriend}
        setMoveFriend={setMoveFriend}
        myPageViewer={myPageViewer}
        setMyPageViewer={setMyPageViewer}
      />
      <div style={{ height: "100px" }} />
    </>
  );
}

export default MainPage;
