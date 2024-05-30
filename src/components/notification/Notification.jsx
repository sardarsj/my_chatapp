import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  const containerStyle = {
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 1000, 
    width: "100%", 
    pointerEvents: "none", 
  };

  const toastContainerStyle = {
    pointerEvents: "auto", 
  };

  return (
    <div style={containerStyle}>
      <ToastContainer position="bottom-right" style={toastContainerStyle} />
    </div>
  );
};

export default Notification;
