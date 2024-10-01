import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

function UserToDoctorMap({ userLoc, docLoc, isLoaded }) {
  const [resultantDirections, setResultantDirections] = useState(null);
  const userLatLong = { lat: +userLoc.lat, lng: +userLoc.lng };
  const doctorLatLong = { lat: +docLoc.lat, lng: +docLoc.lng };
  const directionsFetchedRef = useRef(false);
  const [distanceToTravel, setDistanceToTravel] = useState(null);
  const [timeToTravel, setTimeToTravel] = useState(null);

  useEffect(() => {
    if (isLoaded && doctorLatLong && !directionsFetchedRef.current) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: userLatLong,
          destination: doctorLatLong,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setResultantDirections(result);
            directionsFetchedRef.current = true;
            const leg = result.routes[0].legs[0];
            setDistanceToTravel(leg.distance.text);
            setTimeToTravel(leg.duration.text);
            console.log("Called Directions API for showing Map");
          } else {
            console.error("Error fetching directions:", result);
          }
        }
      );
    }
  }, [isLoaded, userLatLong, doctorLatLong]); // Added dependencies

  return (
    <GoogleMap
      center={userLatLong}
      zoom={7}
      mapContainerStyle={{ width: "100%", height: "400px" }}
      
    >
      {resultantDirections && (
        <DirectionsRenderer directions={resultantDirections} />
      )}
      {distanceToTravel && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "10px",
            background: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Distance: {distanceToTravel}
        </div>
      )}
      {timeToTravel && (
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "10px",
            background: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Duration: {timeToTravel}
        </div>
      )}
    </GoogleMap>
  );
}

export default UserToDoctorMap;
