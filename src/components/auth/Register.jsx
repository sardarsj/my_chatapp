import { useState } from "react";
import "./register.css";
import { toast } from "react-toastify";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import Notification from "../notification/Notification";
const Register = () => {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState(false);
  const handleClick = () => setShow(!show);
  const handleImg = () => setImg(!img);
  const handleBoth = () => {
    handleClick();
    handleImg();
  };
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      toast.success(
        "Registration successful, please check your email to confirm."
      );
      console.log("Registered user:", user);
    } catch (error) {
      toast.error("Registration failed: " + error.message);
      console.error("Error registering:", error.message);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
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
        Already have an account? <Link to="/login">Login here</Link>
      </p>
          <button>Sign Up</button>
        </form>
      </div>
     
      <Notification />
    </div>
  );
};

export default Register;
