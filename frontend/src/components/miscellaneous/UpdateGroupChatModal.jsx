import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import axios from "axios";
import { toast } from "react-toastify";
import UserListItem from "../userAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  // const {selectedChat, setSelectedChat, user } = ChatState();
  const { getUserData, setUserData, selectedChat, setSelectedChat } =
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
    <div>
      <h2>{selectedChat.chatName}</h2>
      <span>
        {selectedChat.users.map((u) => (
          <UserBadgeItem
            key={user._id}
            user={u}
            handleFunction={() => handleRemove(u)}
          />
        ))}
      </span>
      <form>
        <input
          type="text"
          placeholder="Chat Name"
          value={groupChatName}
          onChange={(e) => setGroupChatName(e.target.value)}
        />
        <button onClick={handleRename}>Update</button>
      </form>
      <form>
        <input
          type="text"
          placeholder="Add User to group"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
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

      <button
        onClick={() => handleRemove(user)}
        style={{ color: "white", backgroundColor: "red" }}
      >
        Leave Group
      </button>
    </div>
  );
};

export default UpdateGroupChatModal;
