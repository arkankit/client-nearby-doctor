import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function UserLocationMap({ userLocationDetails }) {
  const [mapCenter, setMapCenter] = useState({
    lat: +userLocationDetails.latitude,
    lng: +userLocationDetails.longitude,
  });
  //using urinary + operator for typecastig string lat long values into numbers before using them in map

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userLocationDetails.latitude || userLocationDetails.longitude) {
      setMapCenter({
        lat: +userLocationDetails.latitude,
        lng: +userLocationDetails.longitude,
      });
      setLoading(false);
    } else {
      setError("Location data is unavailable");
      setLoading(false);
    }
  }, [userLocationDetails]);

  if (loading) {
    return <div>Map Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Map
        defaultZoom={14}
        defaultCenter={mapCenter}
        center={mapCenter}
        style={{height: "320px"}}
        onCameraChanged={(ev) =>
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom
          )
        }
      >
        <Marker position={mapCenter} />
      </Map>
    </APIProvider>
  );
}

export default UserLocationMap;
