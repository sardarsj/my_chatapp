import React, { useEffect, useState } from "react";
import "../chat.css";
import { ChatState } from "../../Context/ChatProvider";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../../config/ChatLogics";

const SingleChat = ({ messages }) => {

  const { getUserData, setUserData, selectedChat } = ChatState();
  const [user, setUser] = useState(getUserData());
  return (
    <>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <span label={m.sender.name} placement="bottom-start" hasArrow>
                {/* instead of div he used avatar  */}
                <div
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                >
                </div>
              </span>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "rgb(123, 67, 179)" : "rgb(140, 24, 90)"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </>
  );
};

export default SingleChat;
