import { useEffect, useState } from "react";
import "./userinfo.css";
import AddInGroup from "../creategroup/AddInGroup";
import { ChatState } from "../../Context/ChatProvider";
// import Logout from "../logout/Logout";
const Userinfo = () => {
  const { getUserData, setUserData } = ChatState();
  const [user, setUser] = useState(getUserData());
  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

  const [addMode, setAddMode] = useState(false);
  const [addbtn, setAddbtn] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUserData(null);
    navigate("/auth");
  };

  return (
    <div className="userInfo">
      <div className="user">
        <img src={user.pic} alt="" />
        <h2>{user.name}</h2>
      </div>
      <div className="icons">
        <img
          src={addbtn ? "./minus.png" : "./more.png"}
          alt="Logout Button"
          onClick={() => setAddbtn((prev) => !prev)}
        />
        <img
          src={addMode ? "./minus.png" : "./edit.png"}
          alt="create group"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {addbtn && <div className="btncls">
        <button onClick={logoutHandler}>Logout</button>
      </div>}
      {/* {addbtn && <Logout />} */}
      {addMode && <AddInGroup />}
    </div>
  );
};

export default Userinfo;
