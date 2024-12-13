import React from "react";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile = ({ setIsLoggedIn }: ProfileProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex justify-end space-x-4 p-3">
      <button
        onClick={handleLogout}
        className="bg-red-400 text-white px-3 py-1 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
