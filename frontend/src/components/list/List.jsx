import React, { useState } from "react";
import "./list.css";
import Userinfo from "./userinfo/Userinfo";
import ChatList from "./chatList/ChatList";
import { ChatState } from "../Context/ChatProvider";
const List = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const {user} = ChatState();
  //using {user.name} we can access the user name
  return (
    <div className="list">
      <Userinfo />
      <ChatList />
    </div>
  );
};

export default List;
