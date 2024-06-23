import "./ChatHeaderProfileModal.css";
const ChatHeaderProfileModal = ({ user, children }) => {
  return (
    <div className="chatheaderprofile">
      <img src={user.pic} alt={user.name} />
      <h3>{user.name}</h3>
    </div>
  );
};

export default ChatHeaderProfileModal;
