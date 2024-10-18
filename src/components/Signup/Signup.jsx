import React, { useState, useEffect, useRef } from "react";
import "./Signup.css";
import "../BasicDetails/BasicDetails.css";

import { Box, Typography, CircularProgress } from "@mui/material"; // importing the named export Box
import { TextField } from "@mui/material"; // importing the named export TextField
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import NearbyLogo from "../NearbyLogo";
//import RegisterUser from "./Utility/registerUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkSession from "../LandingPage/Utility/checkSession";


function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [registerDone, setRegisterDone] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const buttonRef = useRef(null);

  async function logoutIfActive() {
    const sessionActive = await checkSession();
      if (sessionActive) {
        try{
          const response = await axios.get("http://localhost:3000/logout", {
            withCredentials: true,
          });
          if(response.data.success){
            console.log("User logged out as he/she visited signup page");
          }
        } catch (err){
          console.log("Error logging out user:", err);
        }
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

  },[]);

  const navigate = useNavigate();

  function handleClickShowPassword() {
    setShowPassword((prevValue) => {
      return !prevValue;
    });
  }

  async function handleSignup(){
    try{
      const response = await axios.post("http://localhost:3000/register", {userName, enteredPassword}, {withCredentials : true});
      if(response.data.isRegistered){
        setAlreadyRegistered(true);
        setTimeout(() => {
          navigate("/login");
        },4000); // show user already registered message and redirect them to login page after 4 seconds
      } else if(response.data.registerSuccess){
        setRegisterDone(true);
        setTimeout(() => {
          navigate("/details");
        },4000); // redirect user to details page after successfull registeration
      }
    } catch (err){
      console.log("Error in registering:", err);
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
      <h1 className="noto-sans-text">Create an account</h1>
      <TextField
        className="noto-sans-text"
        type="text"
        id="outlined-basic"
        label="Username"
        value={userName}
        onChange={(e) => {setUserName(e.target.value)}}
        variant="outlined"
        required
      />
      <TextField
        className="noto-sans-text"
        type={showPassword ? "text" : "password"}
        id="outlined-basic"
        label="Password"
        value={enteredPassword}
        onChange={(e) => {setEnteredPassword(e.target.value)}}
        variant="outlined"
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
        Already have an account?
        <Link className=" link-spacing" to="/login">
          Login
        </Link>
      </Typography>
      {alreadyRegistered && <Typography id="already-registered" className="noto-sans-text">
        User already registered, redirecting to login!
      </Typography>}
      {alreadyRegistered && <CircularProgress />}
      {registerDone && <Typography id="registered" className="noto-sans-text">
        Getting things done...
      </Typography>}
      {registerDone && <CircularProgress />}
      <Button onClick={handleSignup} disableRipple className="button" ref={buttonRef} variant="contained">Signup</Button>
    </Box>
  );
}

export default Signup;
