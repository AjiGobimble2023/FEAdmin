import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";



const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState(null);
  const [location,setLocation]= useState("");
  const [selectedDate, setSelectedDate] = useState();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handledescriptionChange = (event) => {
    setdescription(event.target.value);
  };
  const handlelocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
    
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location",location);
    formData.append("image", image);
    formData.append("date", selectedDate);
  
    const token = localStorage.getItem("authToken") 
    const url = "http://127.0.0.1:3001/api/events";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        window.location = '/#/tables/events-table'
      } else {
        console.error("Failed to add Events.");
      }
    } catch (error) {
      console.error("Error while adding Events:", error);
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
              Input Event
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
              id="title-text"
              label="Title"
              type="text"
              variant="outlined"
              fullWidth
              value={title}
              required
              onChange={handleTitleChange}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="description-text"
              label="description"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={description}
              required
              onChange={handledescriptionChange}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="location-text"
              label="location"
              type="text"
              variant="outlined"
              fullWidth
              value={location}
              required
              onChange={handlelocationChange}
              sx={{
                mb: 2,
              }}
            />
             <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              style={{
                display: "block",
                fontSize: "20px",
                padding: "3px 10px 3px 3px",
                width: "100%",
                marginBottom: "15px",
              }}
            />
            <input
              accept="image/*"
              id="image-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="image-input">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", maxHeight: "200px", marginBottom: "10px", display:"flex" }}
                />
              )}
              <Button
                component="span"
                variant="outlined"
                color="primary"
                sx={{ mb: 2 }}
              >
                Upload Image
              </Button>
            </label>
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

export default EventForm;
