import { useState, useEffect } from "react";
import SelectUl from "../../publicCompent/SelectUl";
import friendApi from "../../api/friendApi";

function SelectFriend({
  children,
  setFriendViewer,
  refreshFriend,
  setMoveFriend,
}) {
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    (async () => {
      setFriendList(await friendApi.getFriendList());
    })();
  }, [refreshFriend]);

  return (
    <SelectUl
      setFriendViewer={setFriendViewer}
      selectList={friendList}
      setSelectList={setFriendList}
      setMoveFriend={setMoveFriend}
      firend={true}
    >
      {children}
    </SelectUl>
  );
}

export default SelectFriend;
