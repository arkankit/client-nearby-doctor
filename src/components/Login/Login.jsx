import React, { useEffect, useRef, useState } from "react";
import "./../Signup/Signup.css";
import "../BasicDetails/BasicDetails.css";
import "./Login.css"

import { Box, Typography, CircularProgress } from "@mui/material"; // importing the named export Box
import { TextField } from "@mui/material"; // importing the named export TextField
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button, Backdrop } from "@mui/material";
import NearbyLogo from "../NearbyLogo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const buttonRef = useRef(null);

  async function logoutIfActive() {
    try {
      const response = await axios.get("http://localhost:3000/session", {
        withCredentials: true,
      });
      if (response.data.sessionActive) {
        try{
          const response = await axios.get("http://localhost:3000/logout", {
            withCredentials: true,
          });
          if(response.data.success){
            console.log("User logged out as he/she visited login page");
          }
        } catch (err){
          console.log("Error logging out user:", err);
        }
      }
    } catch (err) {
      console.log("Error fetching session:", err);
    }
  }

  useEffect(() => {
    logoutIfActive();

    function handleKeyDown(event){
      if(event.key === "Enter"){
        buttonRef.current.click();
      }
    }

    document.addEventListener("keydown", handleKeyDown); // adding event listner (on mount) to check for enter button press

    return () => {
      document.removeEventListener("keydown", handleKeyDown); // cleanup after unmount
    };
  },[]); // empty dependency so as to execute only on mount

  const navigate = useNavigate();

  function handleClickShowPassword() {
    setShowPassword((prevValue) => {
      return !prevValue;
    });
  }

  async function handleLogin(){
    try{
      const response = await axios.post("http://localhost:3000/login", {username, password}, {withCredentials : true});
      if(response.data.success){
        setLoginSuccess(true);
        setLoginError(false);
        setTimeout(() => {
          navigate("/landing"); // redirecting user to landing page if successfully logged in
        },3000);
      }
    } catch (err) {
      setLoginError(true);
      console.log("Login failed:", err);
    }
  }

  return (
    <Box
      className="signup-box slide-in-fade"
      component="form"
      sx={{ "& > :not(style)": { my: 2, mx: "auto", width: "35ch" } }}
      noValidate
      autoComplete="off"
    >
      <NearbyLogo wth="8em" mb="10em"/>
      <h1 className="noto-sans-text">Welcome back</h1>
      <TextField
        className="noto-sans-text"
        type="text"
        id="outlined-basic"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}}
        required
      />
      <TextField
        className="noto-sans-text"
        type={showPassword ? "text" : "password"}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        required
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Typography className="noto-sans-text">
        Don't have an account?
        <Link className=" link-spacing" to="/signup">
          Signup
        </Link>
      </Typography>
      {loginError && <Typography id ="error-text" className="noto-sans-text">
        Credentials don't match, try again!
      </Typography>}
      {loginSuccess && <Typography id ="success-text" className="noto-sans-text">
        Welcome back!
      </Typography>}
      {loginSuccess && <CircularProgress />}
      <Button className="button"variant="contained" ref={buttonRef} onClick={handleLogin}>Login</Button>
    </Box>
  );
}

export default Login;