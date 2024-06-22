import React, { useState } from "react";
import "./UpdateGroupdChatModal.css"
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../../userAvatar/UserBadgeItem";
import axios from "axios";
import { toast } from "react-toastify";
import UserListItem from "../../userAvatar/UserListItem";
import Avatar from "../Avatar/Avatar";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  // const {selectedChat, setSelectedChat, user } = ChatState();
  const { getUserData, setUserData, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const [user, setUser] = useState(getUserData());

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.error("Only admins can remove someone");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages(); //added so that after a user is removed all the chats refreshes
      setLoading(false);  
    } catch (error) {
      toast.error("Error occured");
      setLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast.error("user already in group");
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast.error("Only admins can add someone");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error("Error occured");
      setLoading(false);
    }
  };

  const handleRename = async (e) => {
    e.preventDefault(); //eh laan naal chl pea, vrna update ni hrea c
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      const idx = chats.findIndex(chat => chat._id === data._id);
      const updatedChats = [...chats];
      updatedChats[idx] = data;
      setChats(updatedChats);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error("Error Occupied!");
      setRenameLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Error occured");
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      <div className="profileHeader">
        <Avatar name={selectedChat.chatName[0]} size="large" />
        <h2>{selectedChat.chatName}</h2>
      </div>
      <div className="users">
        <div className="userListHeader">
          <h3>Members ({selectedChat.users.length})</h3>
          {/*Add functionality to add user*/}
          <img src="../public/plus.png" alt="" onClick={() => console.log("Add User")} />
        </div>
        <div className="userList">
          <div style={{display: 'flex', alignItems: 'center', padding: '8px 0'}}>
            <img style={{width: '48px', height: '48px', marginRight: '16px'}} src={user.pic} alt="" />
            <span>You</span> 
            {user._id === selectedChat.groupAdmin._id && <button style={{marginLeft: 'auto', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'green', color: 'white'}}>Admin</button>}
          </div>
          {selectedChat.users.map((u) => (
            u._id !== user._id && (
              <UserBadgeItem
                key={user._id}
                user={u}
                currentUser = {user._id}
                admin={selectedChat.groupAdmin._id}
                handleFunction={() => handleRemove(u)}
              />
            )
          ))}
        </div>
      </div>
      <form className="updateChatName">
        <input
          type="text"
          placeholder="Chat Name"
          value={groupChatName}
          onChange={(e) => setGroupChatName(e.target.value)}
        />
        <button onClick={handleRename}>Update</button>
      </form>
      {/*<form>
        <input
          type="text"
          placeholder="Add User to group"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>*/}
      {loading ? (
        <div>Loading in progress...</div>
      ) : (
        searchResult?.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            handleFunction={() => handleAddUser(user)}
          />
        ))
      )}

      {user._id !== selectedChat.groupAdmin._id && <button
        onClick={() => handleRemove(user)}
        style={{ color: "white", backgroundColor: "red" , width: '100%', padding: '8px 0', borderRadius: '8px', marginTop: 'auto' }}
      >
        Leave Group
      </button>}
    </div>
  );
};

export default UpdateGroupChatModal;
