import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (username) => {
    navigate(`/tasks?username=${username}`);
  };

  return (
    <div>
      <h1>Login</h1>
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
