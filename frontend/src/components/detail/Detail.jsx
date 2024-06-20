import React, { useEffect, useState } from "react";
import "./detail.css";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";
import { getSender, getSenderFull } from "../../config/ChatLogics";

const Detail = (props) => {
  const { getUserData, setUserData, selectedChat } = ChatState();
  const [user, setUser] = useState(getUserData());
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUserData(null);
    navigate("/auth");
  };
  ``;

  return (
    <div className="detail">
      <div className="user">
        {selectedChat && (
          <div className="user">
            <img src="./avatar.png" alt="" />

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
                />
              </>
            )}

            {/* <img src={user.pic} alt="" /> */}
            {/* <img src="./avatar.png" alt="" /> */}
            <div className="texts">
              {/* <span>{selectedChat.chatName}</span> */}
              {/* <span>{selectedChat.name}</span> */}
              {/* <p>Lorem ipsum dolor sit amet.</p> */}
            </div>
          </div>
        )}
        {/* pic need to be pushed during registration */}
        {/* <img src="/public/avatar.png" alt="" /> */}
        {/* <img src={user.pic} alt="" /> */}
        {/* <h2>Sender's name</h2> */}
        {/* <h2>{user.name}<h2> */}
        {/* <p>{user.email}</p> */}
        {/* <p>Lorem ipsum dolor sit amet.</p> */}
      </div>
      <div className="info">
        {/* <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/10632123/pexels-photo-10632123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/10632123/pexels-photo-10632123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/10632123/pexels-photo-10632123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/10632123/pexels-photo-10632123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div> */}
        {/* <button>Block User</button> */}
        <button className="logout" onClick={logoutHandler}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Detail;
