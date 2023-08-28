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
  
const EventTable = ({ events , loading,onDeleteEvent}) => {
  const handleEditClick = (eventId) => {
    window.location=`#/form-layouts/edit-form-event/${eventId}`;
  };

  const handleDeleteClick = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this Event?")) {
      var token = localStorage.getItem("authToken") 
      const url = `http://localhost:3001/api/events/${eventId}`;
  
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          alert("event deleted successfully!");
          onDeleteEvent();
          
        } else {
          console.error("Failed to delete event.");
        }
      } catch (error) {
        console.error("Error while deleting event:", error);
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

  if (events.length === 0 || events == null || !events) {
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
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              No
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              judul
            </Typography>
          </TableCell>
          <TableCell>
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
              Lokasi
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
        {events.map((event,index) => (
          <TableRow key={event.title}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
               {index + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  wordWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      wordWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal', 
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    {event.title}
                  </Typography>
                 
                </Box>
              </Box>
            </TableCell>
            <TableCell>
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
                    {event.description}
                  </Typography>
              </TableCell>
            <TableCell>
              <img
                src={event.image_url}
                alt={event.title} 
                style={{ maxWidth: '100px', maxHeight: '100px' }} 
              />
            </TableCell>

            <TableCell>
            <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {event.createdBy['full_name']}
                  </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">
                {new Date(event.date).getDate()} {months[new Date(event.date).getMonth()]} {new Date(event.date).getFullYear()}
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {event.location}
                  </Typography>
            </TableCell>
            <TableCell align="right">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEditClick(event._id)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteClick(event._id)}
                sx={{ ml: 2 }}
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

export default EventTable;
