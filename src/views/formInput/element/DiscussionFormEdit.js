import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const DiscussionEditForm = ({Discus}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (Discus) {
      setTitle(Discus.title);
      setContent(Discus.content);
    }
  }, [Discus]);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
  
    const token = localStorage.getItem("authToken") ;
    const url = `http://127.0.0.1:3001/api/DiscussionTopic/${Discus._id}`;
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        window.location = '/#/tables/topic-discussion-table'
      } else {
        console.error("Failed to add Discus.");
      }
    } catch (error) {
      console.error("Error while adding Discus:", error);
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
              Edit Berita
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
              onChange={handleTitleChange}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="content-text"
              label="Content"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={content}
              onChange={handleContentChange}
              sx={{
                mb: 2,
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
                  src= { URL.createObjectURL(image)}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", maxHeight: "200px", marginBottom: "10px", display:"flex" }}
                />
              )}
              {!image && Discus.image_url && (
                <img
                src= {Discus.image_url}
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

export default DiscussionEditForm;
