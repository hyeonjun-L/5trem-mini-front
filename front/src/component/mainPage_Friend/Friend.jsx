import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LightContainer from "../../publicCompent/LightContainer";
import StateToggle from "./StateToggle";
import AcceptFriendList from "./AcceptFriendList";
import MyFriend from "./MyFriend";
import FindFriend from "./FindFriend";
import friendApi from "../../api/friendApi";

function Friend({ refreshFriend, setrefreshFriend, setMoveFriend }) {
  const [stateToggle, setStateToggle] = useState(true);
  const [lightHeight, setLightHeight] = useState("");
  const [friendWaitList, setFriendWaitList] = useState([]);

  useEffect(() => {
    if (!stateToggle) {
      const container = document.getElementById("container");
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setLightHeight(height);
        }
      });
      observer.observe(container);

      (async () => {
        setFriendWaitList(await friendApi.getFriendWaiting());
      })();
    }
  }, [stateToggle, refreshFriend]);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      <StateToggle stateToggle={stateToggle} setStateToggle={setStateToggle} />
      {stateToggle ? (
        <FindFriend
          refreshFriend={refreshFriend}
          setrefreshFriend={setrefreshFriend}
        />
      ) : (
        <LightContainer
          tag={
            <div width={456} height={lightHeight} id={"container"}>
              <AcceptFriend>
                {friendWaitList.map((friendUserInfo, index) => {
                  return (
                    <AcceptFriendList
                      refreshFriend={refreshFriend}
                      setrefreshFriend={setrefreshFriend}
                      friendUserInfo={friendUserInfo}
                      key={index}
                      index={index}
                    ></AcceptFriendList>
                  );
                })}
              </AcceptFriend>
            </div>
          }
        ></LightContainer>
      )}
      <MyFriend
        refreshFriend={refreshFriend}
        setrefreshFriend={setrefreshFriend}
        setMoveFriend={setMoveFriend}
      />
    </div>
  );
}

export default Friend;

const AcceptFriend = styled.div`
  width: 446px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  padding: 13px 0 23px 0;
  background: linear-gradient(108deg, #e8ebf2 0%, #e8ebf2 0%, #f2f3f7 100%);
  box-shadow: 5px 5px 30px #0f296b33;
  border: 0.2px solid #ffffff;
  border-radius: 10px;
`;
