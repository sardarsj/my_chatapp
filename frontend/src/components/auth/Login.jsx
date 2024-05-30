import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import Notification from "../notification/Notification";
const Login = () => {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState(false);
  const handleClick = () => setShow(!show);
  const handleImg = () => setImg(!img);
  const handleBoth = () => {
    handleClick();
    handleImg();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success("Login successful.");
      console.log("Logged in user:", user);
    } catch (error) {
      toast.error("Login failed: " + error.message);
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="off"
          />
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            name="password"
          />
          <img
            src={img ? "./show.png" : "./hide.png"}
            className="showpass"
            onClick={handleBoth}
            alt="show"
          />
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <button>Sign In</button>
        </form>
      </div>

      <Notification />
    </div>
  );
};

export default Login;
