import { useEffect, useState } from "react";
import "./addUser.css";
import { toast } from "react-toastify";
import Notification from "../../../notification/Notification";
import UserListItem from "../../../userAvatar/UserListItem";
import ChatLoading from "../../../ChatLoading";
import { ChatState } from "../../../Context/ChatProvider";
import axios from "axios";

const addUser = () => {
  //copied from details.jsx
  const { getUserData, setUserData, setSelectedChat, chats, setChats } = ChatState();
  const [user, setUser] = useState(getUserData());
  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);
  //copied from details.jsx

  // const { user, setSelectedChat } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search) {
      toast.warning("Please enter something in search field");
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

      // console.log("API response data:", data);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      console.error("Error loading search results:", error);
      toast.error("Failed to load the search results");
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.post("http://localhost:5000/api/chat", {userId}, config);

      if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);

    } catch (error) {
      toast.error("Error fetching the chats")
    }
  };

  return (
    <div className="addUser">
      <form>
        <input
          type="text"
          placeholder="Search by name or email"
          name="name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Go</button>
      </form>

      {loading ? (
        <ChatLoading />
      ) : (
        Array.isArray(searchResult) &&
        searchResult.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            handleFunction={() => accessChat(user._id)}
          />
        ))
      )}
      {/* loading horhi h that we can use spinner or something */}

      {/* <div className="user">
        <div className="detail">
          <img src="./avatar.png" alt="" />
          <span>Jane Doe</span>
        </div>
        <button>Add User</button>
      </div> */}
      <Notification />
    </div>
  );
};

export default addUser;
