import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button, TextField, Pagination } from "@mui/material";

import ListEventTable from "./element/EventTable";

const EventTable = () => {
  const [EventData, setEventData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading,setIsLoading]= useState(false);
  const [isdelete, setIsdelete]= useState(false);
  
  if(!localStorage.getItem("authToken")){
    window.location='/login'
  }

  useEffect(() => {
    setIsLoading(true);
    const delayTimeout = setTimeout(() => {
      fetchEventData(page,search);
    }, 200);
    return () => clearTimeout(delayTimeout);
  }, [page, search,isdelete]);

  const fetchEventData = async (p,s) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/events?page=${p}&search=${s}`);
      const data = await response.json();
      setEventData(data['data']);
      setTotalPage(data['totalPages']);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Event data:", error);
      setIsLoading(false);
    }
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };
  const handleDeleteEvent=()=>{
    setIsdelete(!isdelete);
  }
  const handelAdd=()=>{
    window.location = '/#/form-layouts/form-event'
  }
  return (
        <Box>
          <Card variant="outlined">
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">Data Event</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handelAdd} 
              >
                Tambah Data
              </Button>
              
            </CardContent>
            <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            maxWidth: 300, 
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small" 
            value={search}
            onChange={handleSearchChange}
            fullWidth 
          />
        </Box>
            <Box
              sx={{
                overflow: {
                  xs: "auto",
                  sm: "unset",
                },
              }}
            >
              <ListEventTable events={EventData} loading={isLoading} onDeleteEvent={handleDeleteEvent} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <Pagination
                count={totalPages} 
                page={page}
                onChange={(event, page) => setPage(page)}
                variant="outlined"
                color="primary"
              />
            </Box>
          </Card>
      </Box>
  );
};

export default EventTable;
