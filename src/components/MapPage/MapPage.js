// MapPage

import React, { Component, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Box, Container, CssBaseline, Paper, Stack, styled, TextField, Button} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));
const containerStyle = {
    width: '100%',
    height: '500px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  

  
  
  
  function MapPage() {
    const [location, setLocation] = useState(center);
    const [place, setPlace] = useState("");
  
    const findLocation = () => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=AIzaSyADe_vrxUWg_rdLaOENmhB_zCEA2zqfX24`)
        .then(response => response.json())
        .then(data => setLocation({ lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }))
        .catch(error => console.warn(error));
    };
  
    const findCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
  


    const addDestination = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const place = 'Your Place Name'; // replace with your place name
          console.log('Si existe ubicacion')
          axios.post('http://localhost:3000/trips/1/destinations', {
            destination: {
              name: place,
              lat: location.lat,
              lng: location.lng
            }
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    
    return (
      <Box mt={12}>
        <LoadScript googleMapsApiKey="AIzaSyBDZHTNR2ek-c-Z3lJ-hNoi2ynlw7AqifU">
          <TextField value={place} onChange={e => setPlace(e.target.value)} label="Ubicación" />
          <Button onClick={findLocation}>Buscar</Button>
          <Button onClick={findCurrentLocation}>Usar mi ubicación</Button>
          <Button onClick={addDestination}>Agregar ubicacion a mi viaje</Button>
          <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={10}>
            <Marker position={location} />
          </GoogleMap>
        </LoadScript>
      </Box>
    );
  }
export default MapPage;