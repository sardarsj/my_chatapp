import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { ChatState } from "../Context/ChatProvider";
import { useEffect, useRef, useState } from "react";
import SingleChat from "./SingleChat/SingleChat";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "../miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

//etho props htaaya te detail vaala page dikhna bnd hgyaa h
const Chat = (props) => {
  const { showChatPage, setShowChatPage } = props;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

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

  // const endRef = useRef(null);

  // useEffect(() => {
  //   endRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, []);

  //should have created it in singlechat.jsx
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const fetchMessages = async (e) => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );

      // console.log(messages);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Error Occured while fetching chats");
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]); //whenever user changes chat it will run

  useEffect(() =>  {
    socket.on("message received", (newMessageReceived) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id ){
        //give notification
      }else{
        setMessages([...messages, newMessageReceived]);
      }
    });
  })



  const sendMessage = async (event) => {
    // event.preventDefault();
    if (event.key === "Enter" && newMessage) {
      try {
        const messageContent = newMessage;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5000/api/message/",
          {
            content: messageContent,
            chatId: selectedChat._id,
          },
          config
        );

        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("failed to send the message");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
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
                <UpdateGroupChatModal
                  fetchAgain={props.fetchAgain}
                  setFetchAgain={props.setFetchAgain}
                  fetchMessages={fetchMessages} //added it
                />
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

      {/* <SingleChat fetchAgain={props.fetchAgain} setFetchAgain={props.setFetchAgain} /> */}

      <>
        {selectedChat ? (
          <div className="center">
            <SingleChat messages={messages} />
            {/* <div ref={endRef}></div> */}
          </div>
        ) : (
          <span>click on the user to start chatting</span>
        )}
      </>

      {/* till here the chat box is present */}

      {/* keyboard starts from here */}
      <div className="bottom">
        <form onKeyDown={sendMessage}>
          <input
            type="text"
            placeholder="Enter a Message..."
            onChange={typingHandler}
            value={newMessage}
            required
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;

// <div className="icons">
//           <img src="./img.png" alt="" />
//           <img src="./camera.png" alt="" />
//           <img src="./mic.png" alt="" />
//         </div>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage }
//           // isRequired
//           // onChange={(e) => setText(e.target.value)}
//           onChange={typingHandler}

//         />
//         <div className="emoji">
//           <img
//             src="./emoji.png"
//             alt=""
//             onClick={() => setOpen((prev) => !prev)}
//           />
//           <div className="picker">
//             <EmojiPicker open={open} onEmojiClick={handleEmoji} />
//           </div>
//         </div>
//         <button className="sendButton" onClick={sendMessage}>Send</button>
