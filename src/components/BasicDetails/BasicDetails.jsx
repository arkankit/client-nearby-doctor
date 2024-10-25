import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import NearbyLogo from "../NearbyLogo";
import "../Signup/Signup.css";
import "./BasicDetails.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BasicDetails() {
  const [insurerCode, setInsurerCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [errorMessage, setErrorMesssage] = useState(false);
  const [accessedBeforeSignup, setAccessedBeforeSignup] = useState(false);

  async function checkActiveSession() {
    try {
      const response = await axios.get("https://server-nearby-doctor-production.up.railway.app/session", {
        withCredentials: true,
      });
      if (!response.data.sessionActive) {
        console.log("User not registered yet, redirecting to signup!");
        setAccessedBeforeSignup(true);
        setTimeout(() => {
          navigate("/signup");
        }, 4000);
      } else {
        console.log("User accessed BasicDetails page for updating details");
      }
    } catch (err) {
      console.log("Error fetching session:", err);
    }
  }

  // using effect hook with empty dependency array to check for an active session only one time when the component mounts
  useEffect(() => {
    checkActiveSession();
  }, []);

  const navigate = useNavigate();

  async function submitAdditionalDetails() {
    try {
      const response = await axios.post(
        "https://server-nearby-doctor-production.up.railway.app/details",
        { firstName, lastName, insurerCode },
        { withCredentials: true }
      );

      if (response.data.saved) {
        setDetailsSaved(true);
        setTimeout(() => {
          navigate("/landing");
        }, 3000);
      }
    } catch (err) {
      setErrorMesssage(true);
      setTimeout(() => {
        navigate("/details");
      }, 3000);
      console.log("Error saving details data:", err);
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
      <NearbyLogo wth="8em" mb="5em" />
      {accessedBeforeSignup ? (
        <h1 className="noto-sans-text">
          Please register first, redirecting to Signup
        </h1>
      ) : (
        <h1 className="noto-sans-text">
          Some basic details before we proceed...
        </h1>
      )}
      {!accessedBeforeSignup && (
        <>
          <p className="noto-sans-text">Choose your medical insurer below</p>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Medical Insurance Provider
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={insurerCode}
              label="Medical Insurance Provider"
              onChange={(e) => {
                setInsurerCode(e.target.value);
              }}
            >
              <MenuItem value="tata_aig">TATA AIG</MenuItem>
              <MenuItem value="manipal_cig">MANIPAL CIGNA </MenuItem>
              <MenuItem value="reliance_gen">RELIANCE GENERAL</MenuItem>
              <MenuItem value="hdfc_ergo">HDFC ERGO</MenuItem>
              <MenuItem value="map_bupa">MAX BUPA</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="noto-sans-text"
            type="text"
            id="outlined-basic-firstname"
            label="Your first name"
            variant="outlined"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />
          <TextField
            className="noto-sans-text"
            type="text"
            id="outlined-basic-lastname"
            label="Your last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            variant="outlined"
            required
          />
        </>
      )}
      {detailsSaved && (
        <Typography id="registered" className="noto-sans-text">
          Alright! Getting you in...
        </Typography>
      )}
      {detailsSaved && <CircularProgress />}
      {errorMessage && (
        <Typography id="error-message" className="noto-sans-text">
          Something went wrong, please try again!
        </Typography>
      )}
      {!accessedBeforeSignup && <Button
        disableRipple
        onClick={submitAdditionalDetails}
        className="button"
        variant="contained"
        
      >
        Lets Go!
      </Button>}
    </Box>
  );
}

export default BasicDetails;
