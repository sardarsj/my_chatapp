import { useState } from "react";
import "./userinfo.css";
import AddInGroup from "../creategroup/AddInGroup";
const Userinfo = () => {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="userInfo">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>John Doe</h2>
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
