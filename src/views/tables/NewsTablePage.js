import React, { useState, useEffect } from "react";
import { Card, CardContent, Box, Typography, Button, TextField,Pagination } from "@mui/material";
import ListNewsTable from "./element/NewsTable";

const NewsTable = () => {
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isdelete, setIsdelete]= useState(false);
  const [isLoading,setIsLoading]= useState(false);

  if(!localStorage.getItem("authToken")){
    window.location='/login'
  }

  useEffect(() => {
    setIsLoading(true);
    const delayTimeout = setTimeout(() => {
      fetchNewsData(page,search);
    }, 500);

    return () => clearTimeout(delayTimeout); 
  }, [page, search,isdelete]);

  const fetchNewsData = async (p,s) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/news?page=${p}&search=${s}`);
      const data = await response.json();
      if(response){
      setNewsData(data['data']);
      setTotalPage(data['totalPages']);
      setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };
  const handelAdd=()=>{
    window.location = '/#/form-layouts/form-news'
  }
  const handleDeleteNews=()=>{
    setIsdelete(!isdelete);
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
          <Typography variant="h3">Data Berita</Typography>
          <Button variant="outlined" color="primary" onClick={handelAdd} >
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
          <ListNewsTable News={newsData} onDeleteNews={handleDeleteNews} loading={isLoading}/>
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

export default NewsTable;
