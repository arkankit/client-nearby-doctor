import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

function UserLocationMap({userLocationDetails}) {
  return (
    <APIProvider
          apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <Map
            defaultZoom={14}
            defaultCenter={{
              //using urinary + operator for typecastig string lat long values into numbers before using them in map
              lat: +userLocationDetails.latitude,
              lng: +userLocationDetails.longitude,
            }}
            onCameraChanged={(ev) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom
              )
            }
          >
            <Marker
              position={{
                lat: +userLocationDetails.latitude,
                lng: +userLocationDetails.longitude,
              }}
            />
          </Map>
        </APIProvider>
  );
}

export default UserLocationMap;