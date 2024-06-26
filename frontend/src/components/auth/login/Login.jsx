import { useState } from "react";
import "./login.css";
import axios from "axios";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Notification from "../../notification/Notification";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const { setUserData } = ChatState();
  const [show, setShow] = useState(false);
  const [img, setImg] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);
  const handleImg = () => setImg(!img);
  const handleBoth = () => {
    handleClick();
    handleImg();
  };
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.warning("Please enter all the fields");
      // setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );

      toast.success("Login successful")
      // setUser(data);
      // localStorage.setItem("userInfo", JSON.stringify(data));
      setUserData(data);
      // setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error("Please fill all the fields");
      // toast.error("User does not exists");
      // setLoading(false);
    }


    //supabase code
    // const formData = new FormData(e.target);
    // const email = formData.get("email");
    // const password = formData.get("password");

    // try {
    //   const { user, error } = await supabase.auth.signInWithPassword({
    //     email,
    //     password,
    //   });

    //   if (error) throw error;
    //   toast.success("Login successful.");
    //   console.log("Logged in user:", user);
    // } catch (error) {
    //   toast.error("Login failed: " + error.message);
    //   console.error("Error logging in:", error.message);
    // }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Log-In</h2>
        {/* <h2>Welcome back,</h2> */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}

          />
          <img
            src={img ? "./show.png" : "./hide.png"}
            className="showpass"
            onClick={handleBoth}
            alt="show"
          />
          <p>
          Create an account if you don't have one.
          </p>
          <button>Sign In</button>
        </form>
      </div>

      <Notification />
    </div>
  );
};

export default Login;
