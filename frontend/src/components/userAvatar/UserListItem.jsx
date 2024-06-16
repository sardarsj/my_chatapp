import React, { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';

const UserListItem = ({ user, handleFunction}) => {
  // const { getUserData, setUserData } = ChatState();
  // const [user, setUser] = useState(getUserData());
  return (
    <div className="user">
        <div className="detail">
          <img src={user.pic} alt="" />
          <span>{user.name}</span>
        </div>
        <button onClick={handleFunction}>Add User</button>
      </div>
  )
    
  
}

export default UserListItem;
