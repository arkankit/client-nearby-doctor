import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import "./GoogleMapsComp.css";
import getUserAddress from "./Utility/getAddress.jsx";
import UserLocationMap from "./UserLocationMap/UserLocationMap.jsx";
import "./../Signup/Signup.css";
import { Typography, Tooltip, Switch } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

function GoogleMapsComp({ addressfetcher, userAddressdetails }) {
  const [userLocationForMap, setUserLocationForMap] = useState(null);
  const [address, setAddress] = useState("");
  const [disableLocShareButton, setDisableButton] = useState(false);
  const [showMap, setShowMap] = useState(false);

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocationForMap({ latitude, longitude });
          console.log("Users fetched lati and long:", latitude, longitude);
          const fetchedReadableAddress = await getUserAddress(
            latitude,
            longitude
          );
          setAddress(fetchedReadableAddress);
          console.log(
            "users first time address recieved from Google GeoCoding API:",
            fetchedReadableAddress
          );
          addressfetcher(latitude, longitude, fetchedReadableAddress);
          setDisableButton(true);
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  //useEffect hook is used to call the getuseraddress fucntion when the userlocation state variable changes
  // once the address is fetched, we disable the share location button

  useEffect(() => {
    if (userAddressdetails !== null) {
      setDisableButton(true);
      const { latitude, longitude, readableAddress } = userAddressdetails;
      setAddress(readableAddress);
      setUserLocationForMap({ latitude, longitude });
    }
  }, [userAddressdetails]);

  function handleToggleClick() {
    setDisableButton(() => {
      if (disableLocShareButton) {
        return false;
      } else {
        return true;
      }
    });
  }

  return (
    <Box id="map-container" sx={{ "& > :not(style)": { my: 2 } }}>
      <>
        {disableLocShareButton ? (
          <>
            <Typography variant="h4" className="noto-sans-text">
              Your current location
            </Typography>
            <Typography className="noto-sans-text" style={{textAlign: "center"}}>
              <MyLocationIcon style={{ marginRight: "5px" }} /> {address}
            </Typography>
            <Typography
              style={{
                margin: "0 auto",
                width: "35em",
                textAlign: "center",
                opacity: 0.5, // Use a number between 0 and 1 for opacity
              }}
              variant="body2"
              className="noto-sans-text"
            >
              Use the toggle button below to set your current location as per
              your GPS location or to keep using your previously saved address
            </Typography>
          </>
        ) : (
          <>
            {address === "" ? (
              <p>
                Current location not set, use the "Share your location" button
                below
              </p>
            ) : (
              <Typography variant="h4" className="noto-sans-text">
                Share you current GPS location
              </Typography>
            )}
          </>
        )}
      </>
      <div>
        <Button
          className="button"
          variant="contained"
          onClick={getUserLocation}
          style={{ width: "fit-content", marginLeft: "4em" }}
          disabled={disableLocShareButton}
        >
          Share your location
        </Button>
        <Tooltip
          title={
            disableLocShareButton
              ? "Enable 'SHARE YOUR LOCATION' button"
              : "Keep using your existing address"
          }
          placement="right"
        >
          <Switch onClick={handleToggleClick} />
        </Tooltip>
      </div>

      <Button
        className="button"
        variant="contained"
        sx={{ my: 2, width: "fit-content" }}
        onClick={() => {
          setShowMap(true);
        }}
        disabled={!disableLocShareButton || showMap}
      >
        Show on Map
      </Button>

      {showMap && <UserLocationMap userLocationDetails={userLocationForMap} />}
    </Box>
  );
}

export default GoogleMapsComp;
