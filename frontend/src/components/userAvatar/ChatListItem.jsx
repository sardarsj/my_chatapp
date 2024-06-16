import React from 'react'

const ChatListItem = ({ user, handleFunction}) => {
  return (
    <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          {/* <span>{user.name}</span> */}
          
          <p>Hello</p>
        </div>
      </div>
  )
}

export default ChatListItem
