import React, { useState } from 'react';
import {useSignIn} from "react-auth-kit";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    try{
        const basicAuth = btoa(`${email}:${password}`);
  
        const response = await fetch('http://localhost:3000/api/v1/api-keys', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${basicAuth}`
            }
            
          });
          const information = await response.json();
          console.log(information)
          signIn({
           token: information.token,
           expiresIn: 3600,
           tokenType: "Bearer",
           authState: {email: email}
          })
          localStorage.setItem('token', information.token)
          localStorage.setItem('email', email)

          // Fetch the user's data and save it to local storage
          const userDataResponse = await fetch(`http://localhost:3000/api/v1/users/${email}`, {
            headers: {
              'Authorization': `Bearer ${information.token}`
            }
          });
          const userData = await userDataResponse.json();
          localStorage.setItem('first_name', userData.first_name);
          localStorage.setItem('last_name', userData.last_name);
          localStorage.setItem('dob', userData.dob);
          localStorage.setItem('description', userData.description);
          localStorage.setItem('phone', userData.phone);

          navigate('/')
      }catch(error){}

    };
  

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;