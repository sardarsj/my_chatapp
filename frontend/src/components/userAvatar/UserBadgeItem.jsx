import React, { useEffect } from "react";
// import { ChatState } from "../Context/ChatProvider";

const UserBadgeItem = ({ user, handleFunction, admin, currentUser }) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', padding: '8px 0'}}>
      <img style={{width: '48px', height: '48px', marginRight: '16px'}} src={user.pic} alt="" />
      <span>{user.name}</span>
      {/*Check for button not to show on admin user*/}
      {currentUser === admin && <button style={{marginLeft: 'auto', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'red', color: 'white' ,cursor: 'pointer'}} onClick={handleFunction}>Remove</button>}
    </div>
  );
};

export default UserBadgeItem;
