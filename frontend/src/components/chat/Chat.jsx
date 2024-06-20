import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { ChatState } from "../Context/ChatProvider";
import { useEffect, useRef, useState } from "react";
import SingleChat from "./SingleChat/SingleChat";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "../miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";

//etho props htaaya te detail vaala page dikhna bnd hgyaa h
const Chat = (props) => {
  const { showChatPage, setShowChatPage } = props;

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

  useEffect(() => {
    console.log("Selected Chat: ", selectedChat);
  }, [selectedChat]);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  // const endRef = useRef(null);

  // useEffect(() => {
  //   endRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="top">
        {selectedChat && (
          <div className="user">
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)} 
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {/* <UpdateGroupChatModal
                  fetchAgain={props.fetchAgain}
                  setFetchAgain={props.setFetchAgain}
                /> */}
              </>
            )}

            {/* <img src={selectedChat.pic} alt="" /> */}
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <span>{selectedChat.chatName}</span>
              {/* <span>{selectedChat.sender}</span> */}
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        )}
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img
            src="./info.png"
            alt=""
            onClick={() => setShowChatPage(!showChatPage)}
          />
        </div>
      </div>

      {/* from here main chat portion starts */}

      <SingleChat fetchAgain={props.fetchAgain} setFetchAgain={props.setFetchAgain} />
      

      {/* till here the chat box is present */}
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
