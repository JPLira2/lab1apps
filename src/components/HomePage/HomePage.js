import React, { useEffect, useState } from "react";
import SpinnerOfDoom from './SpinnerOfDoom';
import { Box, Card, CardContent, Typography } from "@mui/material";
import theme from "../../theme";
import axios from "axios";

function HomePage(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const email = localStorage.getItem('email');
      const encodedEmail = encodeURIComponent(email);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/users/${encodedEmail}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPosts(data);
      console.log("LOS POSTS");
      console.log(data);
      console.log("--------");

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box>
        <SpinnerOfDoom color={'primary.main'} />
      </Box>
    );
  }

  return (
    <Box mt={4}> {/* Add a top margin */}
      <Typography variant="h4"> POSTS </Typography>

      {posts && posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: 2 }}> {/* Wrap each post in a Card component */}
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="body1">{post.body}</Typography>
            <Typography variant="subtitle1">{post.author.first_name} {post.author.last_name} </Typography>

          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default HomePage;