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
import checkSession from "./Utility/checkSession";
import { userDetailsGetter } from "../../Contexts/UserDetailsContext"; // importing the context hook for setting the fetched user data as context data

function LandingPage() {
  const [userFirstName, setUserFirstName] = useState("");
  const [userAddress, setUserAddress] = useState(null);
  const [logout, setLogout] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { setUserData } = userDetailsGetter(); // destructuring and getting access to the setter of userData state variable

  const navigate = useNavigate();

  async function checkActiveSession() {
    const sessionActive = await checkSession();
    if (sessionActive) {
      getUserInfo();
    } else {
      console.log("No active session found, redirecting to login!");
      setLogout(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  // using effect hook with empty dependency array to check for an active session only one time when the component mounts
  useEffect(() => {
    checkActiveSession();
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);
  }, []);

  async function getUserInfo() {
    try {
      const response = await axios.get(
        "https://server-nearby-doctor-production.up.railway.app/getDetails",
        {
          withCredentials: true,
        }
      );
      setUserFirstName(response.data.fname);

      if (response.data.user_address !== null) {
        const {
          userlat: latitude,
          userlong: longitude,
          user_address: readableAddress,
        } = response.data; // getting the stored user address details if already available in db.
        //console.log("sending data to context:",userFirstName,response.data.lname,userAddress.readableAddress,response.data.user_plan_code);
        setUserAddress({ latitude, longitude, readableAddress });
        const userData = {
          firstName: response.data.fname,
          lastName: response.data.lname,
          address: response.data.user_address,
          planCode: response.data.user_plan_code,
          userName: response.data.username,
          pwd: response.data.password,
        };
        setUserData(userData); // setting up the context data with the data recieved from db
        localStorage.setItem("userData", JSON.stringify(userData)); // to make data persist on user triggered page reloads
      }
    } catch (err) {
      console.log("Error getting user details:", err);
    }
  }

  //function to handle address being sent from child GoogleMapsComp component

  async function saveUserAddress(latitude, longitude, readableAddress) {
    //save the address details in db for subsequent use
    try {
      const response = await axios.post(
        "https://server-nearby-doctor-production.up.railway.app/saveAddressDetails",
        { latitude, longitude, readableAddress },
        { withCredentials: true }
      );

      if (response.data.addrStored) {
        console.log("User address stored in DB.");
        setUserAddress({ latitude, longitude, readableAddress }); // to show user thier current saved address
      } else console.log("Failed to store user address, check server logs.");
    } catch (err) {
      console.log(
        "Error storing user address in DB, failed to send to server."
      );
    }
  }

  async function logoutUser() {
    try {
      const response = await axios.get(
        "https://server-nearby-doctor-production.up.railway.app/logout",
        {
          withCredentials: true,
        }
      );
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

  return pageLoading ? (
    <CircularProgress id="spinner" className="spinner-class" />
  ) : (
    <div>
      {logout ? (
        <div id="logout-animate">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <LandingHeader name={userFirstName} logOut={logoutUser} />
          <Box
            id="landing-main-box"
            className="landing-container slide-in-fade"
            sx={{ "& > :not(style)": { mx: "auto" } }}
          >
            <PlacesSearch
              setUpdatedAddress={getUserInfo}
              userAddressdetails={userAddress}
            />
            <Box id="landing-map-box" style={{ alignItems: "center" }}>
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
