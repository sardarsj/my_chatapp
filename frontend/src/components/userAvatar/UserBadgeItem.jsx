import React, { useEffect } from "react";
// import { ChatState } from "../Context/ChatProvider";

const UserBadgeItem = ({ user, handleFunction }) => {

  return (
    <div>
      <span
        onClick={handleFunction}
        style={{
          cursor: "pointer",
          padding: "5px 10px",
          margin: "5px",
          height: "33px",
          width: "70px",
          backgroundColor: "rgb(82, 120, 159)",
          color: "white",
          borderRadius: "5px",
          fontSize: "14px",
          fontWeight: "bold",
          display: "flex",
          flexDirection:"row"
        }}
      >
        {user.name}
        <img src="./minus.png" alt="" />
      </span>
    </div>
  );
};

export default UserBadgeItem;
