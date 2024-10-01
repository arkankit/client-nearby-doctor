import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./GoogleMapsComp.css";
import getUserAddress from "./Utility/getAddress.jsx";
import UserLocationMap from "./UserLocationMap/UserLocationMap.jsx";
import "./../Signup/Signup.css";
import { Typography } from "@mui/material";

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
          enableHighAccuracy : true,
          maximumAge : 0
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
      console.log("User address details already present in db.");
      setDisableButton(true);
      const { latitude, longitude, readableAddress } = userAddressdetails;
      setAddress(readableAddress);
      setUserLocationForMap({ latitude, longitude });
    }
  }, [userAddressdetails]);

  return (
    <div id="map-container">
      {disableLocShareButton ? (
        <>
          <Typography variant="h4" className="noto-sans-text" sx={{my: 2}}>
            Your current location
          </Typography>
          <Typography className="noto-sans-text">
            {address}
          </Typography>
        </>
      ) : (
        <p>
          Current location not set, use the "Share your location" button below
        </p>
      )}
      <Button
        className="button"
        variant="contained"
        onClick={getUserLocation}
        disabled={disableLocShareButton}
      >
        Share your location
      </Button>

      <Button
        className="button"
        variant="contained"
        sx={{ my: 2 }}
        onClick={() => {
          setShowMap(true);
        }}
        disabled={showMap}
      >
        Show on Map
      </Button>

      {showMap && <UserLocationMap userLocationDetails={userLocationForMap} />}
    </div>
  );
}

export default GoogleMapsComp;
