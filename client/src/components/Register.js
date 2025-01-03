import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { fetchRegister } from "../services/fetchers";

const Register = ({ onRegisterSuccess }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const { success, error: registerError } = await fetchRegister(name, password);
    if (success) {
      onRegisterSuccess(name);
    } else {
      setError(registerError);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{display: "flex", flexDirection: "column", gap: 3}}>
      <Typography variant="h5">Register</Typography>
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
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        variant="outlined"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;
