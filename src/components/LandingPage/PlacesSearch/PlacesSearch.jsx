import { Box, Typography, TextField } from "@mui/material";
import NearbyLogo from "./../../NearbyLogo";
import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "./../Utility/useDebounce.jsx";

function PlacesSearch() {
  const [resultSuggestions, setResultSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 2000); // sending 2000 ms delay i.e. if user stops typing for 2 second then make places api call
  const [resultsFetched, setResultsFetched] = useState(false);

  useEffect(() => {
    if (debouncedInput && !resultsFetched) {
      const fetchSuggestions = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/autocomplete", {
                params : {
                    input : debouncedInput
                },
              });
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
    setInput(event.target.value);
  }

  function handleSuggestionClick(suggestion) {
    setInput(suggestion.description);
    setResultSuggestions([]);
    setResultsFetched(true); // setting this to true so that further calls are not made to th API
  }

  return (
    <Box id="landing-form-box"
    sx={{position: "relative", width: "100%", maxWidth: "400px", mx: "auto"}}>
      <Box
        className="noto-sans-text landing-headers"
        sx={{ "& > :not(style)": { my: 2, mx: "auto", width: "35ch" } }}
      >
        <NearbyLogo wth="8em" mb="10em" />
        <Typography variant="h5" className="noto-sans-text">
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
        <TextField
          id="outlined-basic"
          label="Search for an address"
          variant="outlined"
          value={input}
          onChange={handleInputChange}
          fullWidth
        />
        <ul
        style={{listStyleType: "none", // to remove default list styling
            padding: 0,
            margin: 0,
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "200px",
            overflow: "auto",
            zIndex: 1000,

        }}>
          {resultSuggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "10px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(event) => (event.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(event) => (event.currentTarget.style.backgroundColor = "transparent")}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}

export default PlacesSearch;
