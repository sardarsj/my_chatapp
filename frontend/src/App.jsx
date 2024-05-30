import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <div className="container">
              <List />
              <Chat />
              <Detail />
            </div>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <div className="container">
              <Login />
            </div>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <div className="container">
              <Register />
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
