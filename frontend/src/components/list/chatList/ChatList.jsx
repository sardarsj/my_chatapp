import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { toast } from "react-toastify";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from "../../ChatLoading";
import UserListItem from "../../userAvatar/UserListItem";
import ChatListItem from "../../userAvatar/ChatListItem";
import { getSender } from "../../../config/ChatLogics";

const ChatList = () => {
  const [loadingChat, setLoadingChat] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [loggedUser, setLoggedUser] = useState();

  //copied from details.jsx
  const {
    getUserData,
    setUserData,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  } = ChatState();
  const [user, setUser] = useState(getUserData());
  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);
  //copied from details.jsx

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      console.log(data);
      setChats(data);
    } catch (error) {
      toast.warning("Failed to load the chats");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {/* from here chat list is there  */}
      <div>
        {chats ? (
          <div>
            {chats.map((chat) => (
              <div
                className="item"
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
              >
                <div className="texts">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>

      {/* : (
        chats.map((chat) => (
          <ChatListItem
            key={chat._id}
            // user={user}
            handleFunction={() => accessChat(chat._id)}
          />
        )
      )
        // <ChatLoading />
        
      )}; */}

      {/* <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div> */}
      {addMode && <AddUser />}
    </div>
  );
};
export default ChatList;
