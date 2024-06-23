import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { toast } from "react-toastify";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from "../../ChatLoading";
import { getSender } from "../../../config/ChatLogics";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000"; // Your backend endpoint

const ChatList = ({ fetchAgain }) => {
  const [loadingChat, setLoadingChat] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

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
      setChats(data);
      setSelectedChat(data[0]);
    } catch (error) {
      toast.warning("Failed to load the chats");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // Connect to WebSocket
    const socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));

    // Listen for new messages
    socket.on("message received", (newMessage) => {
      if (!selectedChat || selectedChat._id !== newMessage.chat._id) {
        fetchChats(); // Fetch chats again to update the list
      } else {
        // Optional: Handle if the message belongs to the selected chat
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchAgain]);

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
            {console.log(chats[0])}
            {chats.map((chat) => (
              <div
                className={
                  selectedChat && selectedChat._id === chat._id ? "item selected" : "item"
                }
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

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;




// import { useEffect, useState } from "react";
// import "./chatList.css";
// import AddUser from "./addUser/addUser";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { ChatState } from "../../Context/ChatProvider";
// import ChatLoading from "../../ChatLoading";
// import UserListItem from "../../userAvatar/UserListItem";
// import ChatListItem from "../../userAvatar/ChatListItem";
// import { getSender } from "../../../config/ChatLogics";

// const ChatList = ({ fetchAgain }) => {
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [addMode, setAddMode] = useState(false);

//   const [loggedUser, setLoggedUser] = useState();

//   //copied from details.jsx
//   const {
//     getUserData,
//     setUserData,
//     selectedChat,
//     setSelectedChat,
//     chats,
//     setChats,
//   } = ChatState();
//   const [user, setUser] = useState(getUserData());
//   useEffect(() => {
//     const userData = getUserData();
//     setUser(userData);
//   }, []);
//   //copied from details.jsx

//   const fetchChats = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.get(
//         "http://localhost:5000/api/chat",
//         config
//       );
//       setChats(data);
//       setSelectedChat(data[0]);
//     } catch (error) {
//       toast.warning("Failed to load the chats");
//     }
//   };

//   useEffect(() => {
//     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
//     fetchChats();
//   }, [fetchAgain]);

//   return (
//     <div className="chatlist">
//       <div className="search">
//         <div className="searchBar">
//           <img src="./search.png" alt="" />
//           <input type="text" placeholder="Search" />
//         </div>
//         <img
//           src={addMode ? "./minus.png" : "./plus.png"}
//           alt=""
//           className="add"
//           onClick={() => setAddMode((prev) => !prev)}
//         />
//       </div>

//       {/* from here chat list is there  */}
//       <div>
//         {chats ? (
//           <div>
//             {console.log(chats[0])}
//             {chats.map((chat) => (
//               <div
//                 className={
//                   selectedChat._id === chat._id ? "item selected" : "item"
//                 }
//                 onClick={() => setSelectedChat(chat)}
//                 key={chat._id}
//               >
//                 <div className="texts">
//                   {!chat.isGroupChat
//                     ? getSender(loggedUser, chat.users)
//                     : chat.chatName}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <ChatLoading />
//         )}
//       </div>

//       {addMode && <AddUser />}
//     </div>
//   );
// };
// export default ChatList;
