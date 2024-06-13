import React from 'react'
import List from "../list/List";
import Chat from "../chat/Chat";
import Detail from "../detail/Detail";
import { ChatState } from '../Context/ChatProvider';

const Chatpage = () => {
  //destructuring user 
  // const {user} = ChatState();

  return (
    <div className='container'>
      <List/>
      <Chat/>
      <Detail/>
    </div>
    
  )
}

export default Chatpage;
