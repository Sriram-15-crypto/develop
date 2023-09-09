import React, { useState } from "react";
import axios from "axios";
import { Paper, Typography, Container, Grid, Box } from "@mui/material";
import { styled } from "@mui/system"; // Import styled from "@mui/system"

// Import your background image here (update the path accordingly)
import backgroundImage from "../images/c.jpg";

const RootContainer = styled(Container)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent white background
  borderRadius: "8px",
}));

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const token = window.location.pathname.split("/")[2];

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4008/login/RESETPASSWORD/${token}`,
        { password }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <RootContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleResetPassword}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label>New Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <button type="submit">Reset Password</button>
            </Grid>
          </Grid>
        </form>
        <Box mt={2}>
          <Typography variant="body1">{message}</Typography>
        </Box>
      </StyledPaper>
    </RootContainer>
  );
}

export default ResetPassword;
