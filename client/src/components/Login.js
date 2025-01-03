import React, { useState, useEffect } from "react";
import { fetchLogin } from "../services/fetchers";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const Login = ({ onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); 

  useEffect(() => {
    setIsFormValid(name.trim().length > 0 && password.trim().length > 0);
  }, [name, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { success, error: loginError } = await fetchLogin(name, password);
    if (success) {
      onLoginSuccess(name);
    } else {
      setError(loginError);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h5" align="center">
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        required
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        required
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!isFormValid} 
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
