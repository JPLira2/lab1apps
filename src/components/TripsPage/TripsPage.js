import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import theme from "../../theme";

function TripsPage(props) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const email = localStorage.getItem('email');
      const encodedEmail = encodeURIComponent(email);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/users/${encodedEmail}/trips`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setTrips(data);
      setLoading(false);
    };

    fetchTrips();
  }, []);

  if (loading) {
    return (
      <Box>
        ESTA CARGANDO
      </Box>
    );
  }

  return (
    <Box mt={4}> {/* Add a top margin */}
      {trips && trips.map((trip) => (
        <Card key={trip.id} sx={{ marginBottom: 2 }}> {/* Wrap each trip in a Card component */}
          <CardContent>
            <Typography variant="h5">{trip.name}</Typography>
            <Typography variant="body1">{trip.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default TripsPage;