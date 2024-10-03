import React, { useEffect, useState } from "react";
import "./../Signup/Signup.css";
import "./LandingPage.css";
import { Box, CircularProgress } from "@mui/material";
import GoogleMapsComp from "./GoogleMapsComp";
import LandingHeader from "./LandingHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorSearchForm from "./DoctorSearchForm/DoctorSearchForm";
import PlacesSearch from "./PlacesSearch/PlacesSearch";

function LandingPage() {
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState(null);
  const [logout, setLogout] = useState(false);

  const navigate = useNavigate();

  async function checkActiveSession() {
    try {
      const response = await axios.get("http://localhost:3000/session", {
        withCredentials: true,
      });
      if (response.data.sessionActive) {
        getUserInfo();
      } else {
        console.log("No active session found, redirecting to login!");
        setLogout(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.log("Error fetching session:", err);
    }
  }

  // using effect hook with empty dependency array to check for an active session only one time when the component mounts
  useEffect(() => {
    checkActiveSession();
  }, []);

  async function getUserInfo() {
    try {
      const response = await axios.get("http://localhost:3000/getDetails", {
        withCredentials: true,
      });
      if (userName === "") {
        setUserName(response.data.fname);
      }
      if (response.data.user_address !== null) {
        const {
          userlat: latitude,
          userlong: longitude,
          user_address: readableAddress,
        } = response.data; // getting the stored user address details if already available in db.
        setUserAddress({ latitude, longitude, readableAddress });
      }
    } catch (err) {
      console.log(response.data.errorMessage);
    }
  }

  //function to handle address being sent from child GoogleMapsComp component

  async function saveUserAddress(latitude, longitude, readableAddress) {
    setUserAddress({ latitude, longitude, readableAddress }); // to show user thier current saved address

    //save the address details in db for subsequent use
    try {
      const response = await axios.post(
        "http://localhost:3000/saveAddressDetails",
        { latitude, longitude, readableAddress },
        { withCredentials: true }
      );

      if (response.data.addrStored) console.log("User address stored in DB.");
      else console.log("Failed to store user address, check server logs.");
    } catch (err) {
      console.log(
        "Error storing user address in DB, failed to send to server."
      );
    }
  }

  async function logoutUser() {
    try {
      const response = await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });
      if (response.data.success) {
        setLogout(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.log("Error logging out!");
    }
  }

  return (
    <div>
      {logout ? (
        <div id="logout-animate">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <LandingHeader name={userName} logOut={logoutUser} />
          <Box
            className="landing-container"
            sx={{ "& > :not(style)": { mx: "auto" } }}
          >
            <PlacesSearch setUpdatedAddress={getUserInfo} />
            <Box id="landing-map-box">
              <GoogleMapsComp
                addressfetcher={saveUserAddress}
                userAddressdetails={userAddress}
              />
            </Box>
          </Box>
          <DoctorSearchForm addressOfUser={userAddress} />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
