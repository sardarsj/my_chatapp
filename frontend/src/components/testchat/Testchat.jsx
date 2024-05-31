import React, { useEffect, useState } from "react";
import axios from "axios";

const Testchat = () => {
  const [chats, setChats] = useState([]);
  const fetchChat = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/chat");
      const data = Array.isArray(response.data) ? response.data : [];
      console.log(response.data);
      setChats(response.data); // Update to set only the data array
    } catch (error) {
      console.error("Error fetching chats:", error);

      setChats([]);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}

      <p>this is it</p>
    </div>
  );
};

export default Testchat;
