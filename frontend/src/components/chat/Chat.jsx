import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { ChatState } from "../Context/ChatProvider";
import { useEffect, useRef, useState } from "react";
import SingleChat from "./SingleChat/SingleChat";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "../miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../miscellaneous/GroupProfile/UpdateGroupChatModal";
import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";
import Lottie from "lottie-react";
import animationData from "../../animations/typing.json";
import Avatar from "../miscellaneous/Avatar/Avatar";

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
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //give notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (event) => {
     event.preventDefault();
    if (newMessage) {
      socket.emit("stop  typing", selectedChat._id);
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

    //typing indication logic

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="chat">
      <div className="top">
        {selectedChat && (
          <div className="user">

            {/* <img src={selectedChat.pic} alt="" /> */}
            {/*<img src="./avatar.png" alt="" />*/}
            {!selectedChat.isGroupChat ? <img src={user.pic} /> : <Avatar name={selectedChat.chatName[0]} size="medium"/>}
            <div className="texts">
              <span>{!selectedChat.isGroupChat ? getSender(user, selectedChat.users) : selectedChat.chatName}</span>
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
        <form onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}>
          {isTyping && (
            <div>
              {/* <Lottie
                options={defaultOptions}
                // height={50}
                width={70}
                style={{ marginBottom: 15, marginLeft: 0 }}
              /> */}
            </div>
          )}
          <input
            type="text"
            placeholder="Enter a Message..."
            value={newMessage}
            onChange={typingHandler}
          />
        </form>
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
         <button className="sendButton" onClick={sendMessage}>Send</button>
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
        // <div className="emoji">
        //   <img
        //     src="./emoji.png"
        //     alt=""
        //     onClick={() => setOpen((prev) => !prev)}
        //   />
        //   <div className="picker">
        //     <EmojiPicker open={open} onEmojiClick={handleEmoji} />
        //   </div>
        // </div>
        // <button className="sendButton" onClick={sendMessage}>Send</button>
