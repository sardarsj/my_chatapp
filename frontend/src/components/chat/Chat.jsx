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

//etho props htaaya te detail vaala page dikhna bnd hgyaa h
const Chat = (props) => {
  const { showChatPage, setShowChatPage } = props;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
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

      console.log(messages);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Occured while fetching chats");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]); //whenever user changes chat it will run

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

      {/* <SingleChat fetchAgain={props.fetchAgain} setFetchAgain={props.setFetchAgain} /> */}

      <>
        {selectedChat ? (
          <div className="center">
            <div className="message">
              <img src="./avatar.png" alt="" />
              <div className="texts">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                  nobis repudiandae, repellat delectus a optio excepturi
                  commodi, facere, temporibus molestias illum?
                </p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="message own">
              <div className="texts">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                  nobis repudiandae, repellat delectus a optio excepturi
                  commodi, facere, temporibus molestias illum?
                </p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="message">
              <img src="./avatar.png" alt="" />
              <div className="texts">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                  nobis repudiandae, repellat delectus a optio excepturi
                  commodi, facere, temporibus molestias illum?
                </p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="message own">
              <div className="texts">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                  nobis repudiandae, repellat delectus a optio excepturi
                  commodi, facere, temporibus molestias illum?
                </p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="message">
              <img src="./avatar.png" alt="" />
              <div className="texts">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                  nobis repudiandae, repellat delectus a optio excepturi
                  commodi, facere, temporibus molestias illum?
                </p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="message own">
              <div className="texts">
                <img
                  src="https://images.pexels.com/photos/10632123/pexels-photo-10632123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                  nobis repudiandae, repellat delectus a optio excepturi
                  commodi, facere, temporibus molestias illum?
                </p>
                <span>1 min ago</span>
              </div>
            </div>
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
