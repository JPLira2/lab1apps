import React, { useState, useEffect } from "react";
import './TopNav.css';
import { Avatar, Box, Button, Container, Menu, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function TopNav(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Get the navigation function from React Router

  useEffect(() => {
    setProfileImage(localStorage.getItem('profileImage'));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Perform logout actions, e.g., clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  };

  const handleProfile = () => {
    localStorage.removeItem('token');
    // Redirect to the profile page
    navigate('/profile');
  };

  return (
    <Box className={"BoxNav"}>
      <Container sx={{ width: '100%', height: '85px', position: 'fixed', top: 0, left: 0 }}>
        <p className={"AppName"}>Travel Log</p>
        <Button
          id="profile-button"
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ position: 'absolute', top: '16px', left: '16px' }}
        >
          <Avatar alt="Travis Howard" src={profileImage || "/static/images/avatar/2.jpg"} left={0} position={"absolute"} />
        </Button>

        <Menu
          id="profile-menu"
          spacing={2}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'profile-button',
          }}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Call handleLogout on logout click */}
        </Menu>
      </Container>
    </Box>
  );
}

export default TopNav;