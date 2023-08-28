import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button, Pagination, TextField } from "@mui/material";

import ListTopicDiscussionTable from "./element/TopicDIscussionTable.js";

const TopicDiscussionTable = () => {
  const [TopicData, setTopicData] = useState([]);
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
      fetchDiscusData(page,search);
    }, 500);

    return () => clearTimeout(delayTimeout); 
  }, [page, search,isdelete]);

  const fetchDiscusData = async (p,s) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/discussionTopic?page=${p}&search=${s}`);
      const data = await response.json();
      setTopicData(data['data']);
      setTotalPage(data['totalPages']);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news data:", error);
      setIsLoading(false);
    }
  };
  const handleSearchChange = (Topic) => {
    setSearch(Topic.target.value);
    setPage(1);
  };
  const handleDeleteDiscus=()=>{
    setIsdelete(!isdelete);
  }
  const handelAdd=()=>{
    window.location = '/#/form-layouts/form-discus'
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
              <Typography variant="h3">Data Topik Diskusi</Typography>
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
              <ListTopicDiscussionTable topics={TopicData} loading={isLoading} onDeleteDiscus={handleDeleteDiscus}/>
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

export default TopicDiscussionTable;
