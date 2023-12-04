// LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/user/logout", {
        method: "GET",
        credentials: "include", // Include credentials in the request
      });

      if (response.ok) {
        navigate("/login"); // Redirect to the home page or login page
      } else {
        console.error("Logout failed:", response.error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:bg-main-hover bg-main text-white px-6 py-3 rounded-[20px] duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
