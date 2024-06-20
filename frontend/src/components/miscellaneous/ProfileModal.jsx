import React from 'react'
import { ChatState } from '../Context/ChatProvider';

const ProfileModal = ({user, children}) => {
  const { getUserData, setUserData, selectedChat } = ChatState();
  // const [user, setUser] = useState(getUserData());
  return (
    <div>
      <h2>{selectedChat.user}</h2>
    </div>
  )
}

export default ProfileModal
// { children ? 
//   (
//   <span>{children}</span>
//   ) :(
//     <span>Nothing happens here</span>
//   )
//   }