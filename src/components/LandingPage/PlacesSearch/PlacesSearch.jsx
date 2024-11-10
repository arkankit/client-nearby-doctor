import { Box, Typography, TextField, Button } from "@mui/material";
import NearbyLogo from "./../../NearbyLogo";
import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "./../Utility/useDebounce.jsx";
import getLatLng from "../Utility/getLatLng.jsx";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

function PlacesSearch({ setUpdatedAddress, userCurrentAddress }) {
  const [resultSuggestions, setResultSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 2000); // sending 2000 ms delay i.e. if user stops typing for 2 second then make places api call
  const [resultsFetched, setResultsFetched] = useState(false);
  const [userUpdatedLocation, setUserUpdatedLocation] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [textLabel, setTextLabel] = useState("Search for an address*");

  async function getUserInfo() {
    // calling this function to initially show the users stored addresses after they login
    try {
      const response = await axios.get("https://server-nearby-doctor-production.up.railway.app/getDetails", {
        withCredentials: true,
      });
      if (response.data.user_address !== null) {
        setInput(response.data.user_address);
        setButtonDisable(true);
        setTextLabel("");
        setResultsFetched(true);
      }
    } catch (err) {
      console.log(response.data.errorMessage);
    }
  }

  useEffect(() => {
    getUserInfo(); // calling on mount or when parent sends an updated address
  }, [userCurrentAddress]);

  useEffect(() => {
    if (debouncedInput && !resultsFetched) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            "https://server-nearby-doctor-production.up.railway.app/api/autocomplete",
            {
              params: {
                input: debouncedInput,
              },
            }
          );
          setResultSuggestions(response.data.predictions || []);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
        }
      };

      fetchSuggestions();
    } else {
      setResultSuggestions([]);
    }
  }, [debouncedInput]); // api call is only made when debounced value is set(using if condition) or changed (using the useDebounced hook)

  function handleInputChange(event) {
    setResultsFetched(false); // so that the call is made again if user types a different address
    setInput(event.target.value);
  }

  function handleEditClick() {
    setButtonDisable(false);
    setTextLabel("Search for an address*");
    setResultsFetched(false);
    setInput("");
  }

  async function handleSuggestionClick(suggestion) {
    setInput(suggestion.description);
    setResultSuggestions([]);
    setResultsFetched(true); // setting this to true so that further calls are not made to th API
    const location = await getLatLng(suggestion.place_id); // to get users lat long from selected address
    console.log(
      `lat lng fetched for users selected location is lat: ${location.lat}, lng: ${location.lng}`
    );
    // save this in the db later
    setUserUpdatedLocation(location);
  }

  async function handleButtonSubmit() {
    try {
      const response = await axios.post(
        "https://server-nearby-doctor-production.up.railway.app/saveAddressDetails",
        {
          latitude: userUpdatedLocation.lat,
          longitude: userUpdatedLocation.lng,
          readableAddress: input,
        },
        { withCredentials: true }
      );

      if (response.data.addrStored)
        console.log("Updated user address stored in DB.");
      else
        console.log(
          "Failed to store user's updated address, check server logs."
        );
    } catch (err) {
      console.log(
        "Error storing user's updated address in DB, failed to send to server."
      );
    }

    setButtonDisable(true);
    setTextLabel("");
    setUpdatedAddress(); // trigger getUserInfo of the landing page parent component to show the user thier updated address
  }

  return (
    <Box
      id="landing-form-box"
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        mx: "auto",
      }}
    >
      <Box
        className="noto-sans-text landing-headers"
        style={{ margin: "0px" }}
        sx={{ "& > :not(style)": { my: 2, mx: "auto", width: "35ch" } }}
      >
        <NearbyLogo wth="8em" mb="8em" />
        <Typography
          style={{ width: "fit-content" }}
          variant="h5"
          className="noto-sans-text"
        >
          Want to set another address?
        </Typography>
        <Typography className="noto-sans-text">
          Enter that address below
        </Typography>
      </Box>

      <Box
        className="noto-sans-text landing-form"
        sx={{ "& > :not(style)": { my: 2 } }}
      >
        <Typography
          style={{ textAlign: "center", opacity: "50%" }}
          variant="body2"
          className="noto-sans-text"
        >
          *We have set your current location as per your previously entered
          address, you can change it by clicking on the pencil icon below
        </Typography>
        <IconButton
          style={{ width: "fit-content", margin: "0 auto" }}
          onClick={handleEditClick}
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
        <TextField
          id="outlined-basic-input"
          label={textLabel}
          variant="outlined"
          value={input}
          onChange={handleInputChange}
          fullWidth
          disabled={buttonDisable}
          style={{ marginBottom: "0px" }} // so that the below ul appears to be touching the search field
        />
        {!resultsFetched && ( // show ul only when edit button is clicked
          <ul
            style={{
              listStyleType: "none", // to remove default list styling
              padding: 0,
              margin: 0,
              position: "static",
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              maxHeight: "200px",
              overflowY: "scroll", // only set scrolling in Y axis i.e top to bottom or vice versa
              scrollbarWidth: "none", // to remove the scrollbar
              zIndex: 1000,
            }}
          >
            {resultSuggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(event) =>
                  (event.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(event) =>
                  (event.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}

        {resultsFetched && (
          <Button
            className="button"
            variant="contained"
            sx={{ my: 2 }}
            onClick={handleButtonSubmit}
            disabled={buttonDisable}
          >
            Set as current address
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default PlacesSearch;
