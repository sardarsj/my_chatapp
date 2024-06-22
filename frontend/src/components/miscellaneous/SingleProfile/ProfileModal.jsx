import "./ProfileModal.css"
const ProfileModal = ({ user, children }) => {
  return (
    <div className="profiledisplay">
      <img src={user.pic} alt={user.name} />
      <h3>{user.name.toUpperCase()}</h3>
      <h4>{user.email}</h4>

    </div>
        
        
    
  );
};

export default ProfileModal;
