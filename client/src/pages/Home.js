import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Button } from "@mui/material";
import Login from "../components/Login";
import Register from "../components/Register";

const Home = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLoginSuccess = (username) => {
    navigate(`/tasks?username=${username}`);
  };

  const handleRegisterSuccess = (username) => {
    setIsRegistering(false); 
  };

  return (
    <Paper
    sx={{
      padding: 3,
      textAlign: "center",
      boxShadow: 3,
      borderRadius: 2,
    }}
    >
      {isRegistering ? (
        <Register onRegisterSuccess={handleRegisterSuccess} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
      <Button
        variant="outlined"
        onClick={() => setIsRegistering((prev) => !prev)}
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {isRegistering ? "Back to Login" : "Register"}
      </Button>
    </Paper>
  );
};

export default Home;
