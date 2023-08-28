import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button, TextField, Pagination } from "@mui/material";

import ListUserTable from "./element/UserTable";

const UserTable = () => {
  const [UserData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading,setIsLoading]= useState(false);

  if(!localStorage.getItem("authToken")){
    window.location='/login'
  }
  useEffect(() => {
    setIsLoading(true);
    const delayTimeout = setTimeout(() => {
      fetchUsersData(page,search);
    }, 500);

    return () => clearTimeout(delayTimeout); 
  }, [page, search]);

  const fetchUsersData = async (p,s) => {
    const token = localStorage.getItem("authToken") ;
    try {
      const headers = {
        "Authorization": `Bearer ${token}`
      };
      const response = await fetch(`http://127.0.0.1:3001/api/alluser?page=${p}&search=${s}`, {
        headers: headers
      });
      const data = await response.json();
      console.log(data);
      setUserData(data['data']);
      setTotalPage(data['totalPages']);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news data:", error);
      setIsLoading(false);
    }
  };
  const handleSearchChange = (User) => {
    setSearch(User.target.value);
    setPage(1);
  };
  const handelAdd=()=>{
    window.location = '/#/form-layouts/form-user'
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
              <Typography variant="h3">Data User</Typography>
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
              <ListUserTable users={UserData} loading={isLoading}/>
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
                onChange={(User, page) => setPage(page)}
                variant="outlined"
                color="primary"
              />
            </Box>
          </Card>
      </Box>
  );
};

export default UserTable;
