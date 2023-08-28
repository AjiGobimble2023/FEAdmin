import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress
} from "@mui/material";

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const NewsTable = ({ News, onDeleteNews ,loading })  => {
  const handleEditClick = (newsId) => {
    window.location=`#/form-layouts/edit-form-news/${newsId}`;
  };

  const handleDeleteClick = async (newsId) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      var token = localStorage.getItem("authToken") 
      const url = `http://localhost:3001/api/news/${newsId}`;
  
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          alert("News deleted successfully!");
          onDeleteNews();
          
        } else {
          console.error("Failed to delete news.");
        }
      } catch (error) {
        console.error("Error while deleting news:", error);
      }
    }
  };
  
  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (News.length === 0 || News == null || !News) {
    return (
      <TableHead>
        <TableRow>
          <TableCell >
            <Typography>Data Kosong</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  } else {
    return (
      <Box
        sx={{
           wordWrap: 'break-word',
                      
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
          overflowX: "auto",
          maxWidth: "100%", 
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
             wordWrap: 'break-word',
                      
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
            mt: 3,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell >
                <Typography color="textSecondary" variant="h6">
                  No
                </Typography>
              </TableCell>
              <TableCell >
                <Typography color="textSecondary" variant="h6">
                  judul
                </Typography>
              </TableCell>
              <TableCell >
                <Typography color="textSecondary" variant="h6">
                  deskripsi
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  image
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  pembuat
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  tanggal
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  aksi
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {News.map((news, index) => (
              <TableRow key={news.title}>
                <TableCell >
                  <Typography
                    sx={{
                       wordWrap: 'break-word',
                      
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography
                    variant="h6"
                    
                    sx={{
                       wordWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
                                          }}
                  >
                    {news.title}
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography
                    variant="p"
                    sx={{
                       wordWrap: 'break-word',
                      
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
                      fontWeight: "400",
                    }}
                  >
                    {news.content}
                  </Typography>
                </TableCell>
                <TableCell >
                  <img
                    src={news.image_url} // Add the actual image URL here
                    alt={news.title}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                </TableCell>
                <TableCell >
                  <Typography
                    variant="h6"
                    sx={{
                       wordWrap: 'break-word',
                      
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
                      fontWeight: "600",
                    }}
                  >
                    {news.author['full_name']}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    {new Date(news.createdAt).getDate()} {months[new Date(news.createdAt).getMonth()]} {new Date(news.createdAt).getFullYear()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(news._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(news._id)}
                    sx={{
                       wordWrap: 'break-word',
                      
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',  ml: 2 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }
};

export default NewsTable;
