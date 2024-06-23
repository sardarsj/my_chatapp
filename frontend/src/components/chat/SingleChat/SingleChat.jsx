import React, { useEffect, useRef, useState } from "react";
import "../chat.css";
import { ChatState } from "../../Context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../../config/ChatLogics";
import io from "socket.io-client";

const SingleChat = ({ messages }) => {
  const { getUserData, setUserData, selectedChat } = ChatState();
  const [user, setUser] = useState(getUserData());
  const [socketConnected, setSocketConnected] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {messages &&
        messages.map((m, i) => (
          <div ref={(i === messages.length - 1) ? endRef : null} style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <span label={m.sender.name}>
                {console.log("Message: ", m)}
                {/* instead of div the source used avatar  */}
                <div>
                  <img
                    src={m.sender.pic}
                    name={m.sender.name}
                    style={{
                      cursor: "pointer",
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                      marginRight: "5px",
                    }}
                  />
                </div>
              </span>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id
                    ? "rgb(123, 67, 179)"
                    : "rgb(140, 24, 90)"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
              {/*<div ref={endRef}></div>*/}
            </span>
          </div>
        ))}
    </>
  );
};

export default SingleChat;
