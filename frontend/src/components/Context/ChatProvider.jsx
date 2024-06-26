import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  const getUserData = () => {
    let userData = user ? user : JSON.parse(localStorage.getItem("userInfo"));
    if (userData) {
      return userData;
    } else return navigate("/auth");
  };

  const setUserData = (data) => {
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      localStorage.removeItem("userInfo");
    }
    setUser(data);
  };

  return (
    <ChatContext.Provider
      value={{
        getUserData,
        setUserData,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
