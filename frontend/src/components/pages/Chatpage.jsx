import React, { useState } from 'react'
import List from "../list/List";
import Chat from "../chat/Chat";
import Detail from "../detail/Detail";
import { ChatState } from '../Context/ChatProvider';

const Chatpage = () => {
  //destructuring user 
  // const {user} = ChatState();
  const [showChatPage, setShowChatPage] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className='container'>
      <List fetchAgain={fetchAgain}/>
      <Chat showChatPage={showChatPage} setShowChatPage={setShowChatPage} fetchAgain={fetchAgain} setFetchAgain = {setFetchAgain}/>
      {showChatPage && <Detail/>}
    </div>
    
  )
}

export default Chatpage;
