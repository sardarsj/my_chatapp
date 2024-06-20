import { useEffect, useState } from "react";
import "./userinfo.css";
import AddInGroup from "../creategroup/AddInGroup";
import { ChatState } from "../../Context/ChatProvider";
const Userinfo = () => {
  
  const { getUserData, setUserData } = ChatState();
  const [user, setUser] = useState(getUserData());
  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);



  const [addMode, setAddMode] = useState(false);

  return (
    <div className="userInfo">
      <div className="user">
        <img src={user.pic}  alt="" />
        <h2>{user.name}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        {/* <img src="./video.png" alt="" /> */}
        <img
          src= {addMode ? "./minus.png" : "./edit.png"}
          alt="create group"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {addMode && <AddInGroup/>}

    </div>
  );
};

export default Userinfo;
