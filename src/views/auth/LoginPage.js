import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  TextField,
  Button,
} from "@mui/material";
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

const LoginPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = new URLSearchParams();
    data.append("email", Email);
    data.append("password", Password);
  
    const url = "http://127.0.0.1:3001/api/login";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });
      console.log(data.toString());
      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        localStorage.setItem("authToken", token);
        window.location = '/#/tables/news-table';
      } else {
        console.error("Failed to log in.");
        alert("Failed to log in.");
      }
    } catch (error) {
      console.error("Error while logging in:", error);
      alert("Error while logging in:", error);
    }
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "500px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <AccountBoxRoundedIcon
              sx={{
                fontSize: 100,
                color: "gray", // Warna ikon
              }}
            />
          </Box>
          <form onSubmit={handleSubmit}>
          <TextField
            id="Email-text"
              label="Email"
              type="text"
              variant="outlined"
              fullWidth
              value={Email}
              required
              onChange={handleEmailChange}
              sx={{
                mb: 2,
              }}
            />
            
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              onChange={handlePasswordChange}
              value={Password}
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              required
              sx={{
                mb: 2,
              }}
            />

            <div>
              <Button type="submit" color="primary" sx={{
                width:200
              }} variant="contained">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
