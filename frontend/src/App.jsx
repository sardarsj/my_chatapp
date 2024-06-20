import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Chatpage from "./components/pages/Chatpage";
import Testchat from "./components/testchat/Testchat";
import Homepage from "./components/pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatProvider from "./components/Context/ChatProvider";
const App = () => {
  const user = true;
  return (
    <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route path="/auth" element={<Homepage />}></Route>
          <Route path="/chats" element={<Chatpage />}></Route>
        </Routes>
      </ChatProvider>
    </BrowserRouter>
  );
};

export default App;
