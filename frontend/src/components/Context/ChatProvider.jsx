import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const[selectedChat, setSelectedChat] =useState();
  const[chats, setChats] = useState([]);


  const navigate = useNavigate();
  //taking user details from local storage
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo);
  //   //if user is not logged in, then it will be redirected to login page
  //   if (!userInfo) {
  //     navigate("/auth");
  //   }
  // }, [user]);

  const getUserData = () => {
    let userData = user ? user : JSON.parse(localStorage.getItem("userInfo"));
    if(userData){
      return userData;
    }
    else return navigate("/auth");
  };

  const setUserData = (data) => {
    if(data){
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    else{
      localStorage.removeItem("userInfo");
    }
    setUser(data);
  };

  return (
    <ChatContext.Provider value={{ getUserData, setUserData, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
