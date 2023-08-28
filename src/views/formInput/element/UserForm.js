import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [campusName, setCampusName] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCampusNameChange = (event) => {
    setCampusName(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Password and Confirm Password must match.");
      return;
    }
  
    const formData = new URLSearchParams();
    formData.append("full_name", name);
    formData.append("email", email);
    formData.append("birthDate", birthdate);
    formData.append("address", address);
    formData.append("campus_name", campusName);
    formData.append("city", city);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);

    
    const url = "http://127.0.0.1:3001/api/register";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers:{
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
     
      if (response.ok) {
        window.location = '/#/tables/users-table'
      } else {
        console.error(`Failed to add User.`,response);
      }
    } catch (error) {
      console.error("Error while adding User:", error);
    }
  };
  

  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            padding: "15px 30px",
          }}
          display="flex"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Input Pengguna
            </Typography>
          </Box>
        </Box>
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              id="name-text"
              label="Nama"
              type="text"
              variant="outlined"
              fullWidth
              value={name}
              required
              onChange={handleNameChange}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="email-text"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              required
              onChange={handleEmailChange}
              sx={{
                mb: 2,
              }}
            />
             <input
              type="date"
              value={birthdate}
              onChange={handleBirthdateChange}
              style={{
                display: "block",
                fontSize: "20px",
                padding: "3px 10px 3px 3px",
                width: "100%",
                marginBottom: "15px",
              }}
            />
            <TextField
              id="address-text"
              label="Alamat"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={address}
              required
              onChange={handleAddressChange}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="campus-name-text"
              label="Nama Kampus"
              type="text"
              variant="outlined"
              fullWidth
              value={campusName}
              required
              onChange={handleCampusNameChange}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="city-text"
              label="Kota"
              type="text"
              variant="outlined"
              fullWidth
              value={city}
              required
              onChange={handleCityChange}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="phone-number-text"
              label="Nomor Telepon"
              type="tel"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              required
              onChange={handlePhoneNumberChange}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="password-text"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              required
              onChange={handlePasswordChange}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="confirm-password-text"
              label="Konfirmasi Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              required
              onChange={handleConfirmPasswordChange}
              sx={{
                mb: 2,
              }}
            />
            <div>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;
