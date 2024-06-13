import React, { useState } from 'react'
import List from "../list/List";
import Chat from "../chat/Chat";
import Detail from "../detail/Detail";
import { ChatState } from '../Context/ChatProvider';

const Chatpage = () => {
  //destructuring user 
  // const {user} = ChatState();
  const [showChatPage, setShowChatPage] = useState(false);

  return (
    <div className='container'>
      <List/>
      <Chat showChatPage={showChatPage} setShowChatPage={setShowChatPage} />
      {showChatPage && <Detail/>}
    </div>
    
  )
}

export default Chatpage;
