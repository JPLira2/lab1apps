import React, { useState, useRef } from "react";
import {Box, Typography, Button, TextField, Grid} from "@mui/material";

function ProfilePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [cameraAccess, setCameraAccess] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const email = localStorage.getItem('email');
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const dob = localStorage.getItem('dob');
  const description = localStorage.getItem('description');
  const phone = localStorage.getItem('phone');

  const handleImageUpload = event => {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem('profileImage', reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleCameraAccess = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraAccess(true);
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setCameraAccess(false);
      }
    }
  };

  const handleTakePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setSelectedFile(dataUrl);
    localStorage.setItem('profileImage', dataUrl);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" component="div" gutterBottom>
        Profile
      </Typography>

      <Typography variant="h4" component="div" gutterBottom>
        {email}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="First Name" value={firstName} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Last Name" value={lastName} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Date of Birth" value={dob} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Phone" value={phone} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Description" value={description} variant="outlined" fullWidth multiline rows={4} disabled />
        </Grid>
      </Grid>
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Profile Picture
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>
      <Button variant="contained" onClick={handleCameraAccess} sx={{ mt: 2 }}>
        Access Camera
      </Button>
      {cameraAccess && (
        <Button variant="contained" onClick={handleTakePhoto} sx={{ mt: 2 }}>
          Take Photo
        </Button>
      )}
      <video ref={videoRef} width="640" height="480" style={{ display: 'none' }} />
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
      {selectedFile && (
        <img src={typeof selectedFile === 'string' ? selectedFile : URL.createObjectURL(selectedFile)} alt="Profile" style={{ width: '100px', height: '100px', mt: 2 }} />
      )}
    </Box>
  );
}

export default ProfilePage;