import React from "react";

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";

const Header = (props) => {


  



  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
  
      const url = "http://127.0.0.1:3001/api/logout";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });
  
      if (response.ok) {
        localStorage.removeItem("authToken");
        window.location="../../login"
      } else {
        console.error("Failed to logout.", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
 

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>
        <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="dd-menu"
          aria-haspopup="true"
        >
        
        </IconButton>
        
        <Box flexGrow={1} />

        {/* ------------------------------------------- */}
        {/* Notifications Dropdown */}
        {/* ------------------------------------------- */}
        <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="notification-menu"
          aria-haspopup="true"
        >
        </IconButton>
        
        {/* ------------------------------------------- */}
        {/* End Notifications Dropdown */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
             <Avatar
              sx={{
                width: 30,
                height: 30,
                backgroundColor: "gray", // Warna latar belakang ikon
              }}
            >
              <AccountBoxRoundedIcon
                sx={{
                  fontSize: 25, // Ukuran ikon di dalam avatar
                  color: "white", // Warna ikon di dalam avatar
                }}
              />
            </Avatar>
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;