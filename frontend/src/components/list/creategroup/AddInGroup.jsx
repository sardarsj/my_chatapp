import "./addInGroup.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Notification from "../../notification/Notification";
import UserListItem from "../../userAvatar/UserListItem";
import ChatLoading from "../../ChatLoading";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserBadgeItem from "../../userAvatar/UserBadgeItem";

const AddInGroup = ({ children }) => {
  //copied from details.jsx
  const { getUserData, setUserData, setSelectedChat, chats, setChats } =
    ChatState();
  const [user, setUser] = useState(getUserData());
  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);
  //copied from details.jsx

  // const { user, setSelectedChat } = ChatState();

  // new use states

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setselectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState(false);

  // new use states

  // const { user, chats, setChats } = ChatState();

  const handleSubmit = async (e) => {
    if (!groupChatName || !selectedUsers) {
      toast.warning("Please fill all the fields");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      const { data } = await axios.post(
        `http://localhost:5000/api/chat/group`,

        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      // console.log(data);
      toast.success("New group chat created");
    } catch (error) {
      toast.error("failed to create the chat");
    }
  };

  const handleDelete = (delUser) => {
    setselectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.warning("User Already Added");
      return;
    }

    setselectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    // e.preventDefault();

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
      toast.error("Failed to load the search results");
    }
  };

  return (
    <div className="addUserInGroup">
      <span>{children}</span>
      <h3>Create Group Chat</h3>
      <form>
        <input
          type="text"
          placeholder="Chat Name"
          onChange={(e) => setGroupChatName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add Users like dd"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>

      <div className="selectUserModal">
        {selectedUsers.map((u) => (
          <UserBadgeItem
            key={user._id}
            user={u}
            handleFunction={() => handleDelete(u)}
          />
        ))}
      </div>

      <div className="searchedUser">
        {loading ? (
          <div>Loading</div>
        ) : (
            searchResult
              ?.slice(0, 4)
              .map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))

        )}
      </div>

      {/* loading horhi h that we can use spinner or something */}
      <button className="createGroupBtn" onClick={handleSubmit}>Create Chat</button>

      <Notification />
    </div>
  );
};

export default AddInGroup;
