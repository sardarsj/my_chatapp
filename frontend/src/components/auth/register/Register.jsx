import { useState } from "react";
import "./register.css";
import { toast } from "react-toastify";
import { Link, unstable_HistoryRouter } from "react-router-dom";
import axios from "axios";

import Notification from "../../notification/Notification";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState(false);
  const [pic, setPic] = useState("");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [picLoading, setPicLoading] = useState(false); //roadside vaale da hi h
  const handleClick = () => setShow(!show);
  const handleImg = () => setImg(!img);
  const handleBoth = () => {
    handleClick();
    handleImg();
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  // const handleAvatar = (e) => {
  //   if (e.target.files[0]) {
  //     setAvatar({
  //       file: e.target.files[0],
  //       url: URL.createObjectURL(e.target.files[0]),
  //     });
  //   }
  // };


 
  //uploading the picture as per roadside
  const postDetails = (pics) => {
    setLoading(true);
    if (pics == undefined) {
      toast.warning("Please upload image");
      return;
    }
    
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "talkative-chatapp");
      data.append("cloud_name", "sardarsj");
      fetch("https://api.cloudinary.com/v1_1/sardarsj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setAvatar((prevAvatar) => ({
            ...prevAvatar,
            url: data.url.toString(),
          }));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast.warning("Please Select an Image");
    }
  };
  //await laana pyega edde lyi
  const handleRegister = async (e) => {
    e.preventDefault();
    // setPicLoading(true);
    if (!name || !email || !password) {
      toast.warning("Please fill all the fields");
      setPicLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.warning("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      setPicLoading(false);
      return;
    } 

    // if (password !== confirmpassword) {
    //   toast.warning("Password does not match");
    // }

    console.log(name, email, password, pic);

    try {
      //headers for the file (study it)
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast.success("Registration successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      //bhjnn lyiii
      navigate("/chats");
    } catch (error) {
      toast.error("User already exists" );
      // setPicLoading(false);
    }

    

    //supabase vaala code
    // const formData = new FormData(e.target);
    // const email = formData.get("email");
    // const password = formData.get("password");

    // try {
    //   const { user, error } = await supabase.auth.signUp({
    //     email,
    //     password,
    //   });

    //   if (error) throw error;

    //   toast.success(
    //     "Registration successful, please check your email to confirm."
    //   );
    //   console.log("Registered user:", user);
    // } catch (error) {
    //   toast.error("Registration failed: " + error.message);
    //   console.error("Error registering:", error.message);
  };

  return (
    <div className="register">
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="pic">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="pic"
            style={{ display: "none" }}
            // onChange={handleAvatar}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Username"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
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
          <p>Login, if you already have an account</p>
          <button>Sign Up</button>
        </form>
      </div>

      <Notification />
    </div>
  );
};

export default Register;
