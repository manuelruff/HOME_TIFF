import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { fetchLogin } from "../services/fetchers";

const Login = ({ onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      sx={{display: "flex",flexDirection: "column",gap: 3}}>
      <Typography variant="h5" align="center">Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
