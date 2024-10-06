import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./../../../Signup/Signup.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import "./../../../BasicDetails/BasicDetails.css";
import "./UserProfile.css";
import { userDetailsGetter } from "../../../../Contexts/UserDetailsContext"; // importing the context hook to access the user data set by landing page

function UserProfile() {
  const { userData } = userDetailsGetter(); // using the context hook to get access to the users context data
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [insurerCode, setInsurerCode] = useState("");

  const navigate = useNavigate();

  function handleFNEditClick() {}

  function handleLNEditClick() {}

  function handleSubmitData() {}

  useEffect(() => {
    if (userData) {
      setFirstname(userData.firstName);
      setLastname(userData.lastName);
      setInsurerCode(userData.planCode);
    }
  }, [userData]);

  return (
    <Box
      className="slide-in-fade"
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "-5% 10%",
        width: "700px",
        padding: "25vh 0",
        "& > :not(style)": { padding: "1em 0" },
      }}
    >
      <Typography
        align="left"
        justifyContent="unset"
        variant="h3"
        className="noto-sans-text"
      >
        Your Basic Details
      </Typography>
      <Box sx={{ display: "flex" }}>
        <TextField
          className="noto-sans-text"
          type="text"
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          required
        />
        <IconButton
          style={{ width: "fit-content", margin: "0.5em auto" }}
          onClick={handleFNEditClick}
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
        <TextField
          className="noto-sans-text"
          type="text"
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          required
        />
        <IconButton
          style={{ width: "fit-content", margin: "0.5em auto" }}
          onClick={handleLNEditClick}
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </Box>
      <FormControl>
        <InputLabel sx={{ paddingTop: "1em" }} id="demo-simple-select-label">
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
      <Box sx={{ display: "flex" }}>
        <Button
          onClick={() => {
            navigate("/landing");
          }}
          className="button"
          variant="contained"
        >
          Go Back
        </Button>
        <Button
          sx={{ margin: "0 4em" }}
          onClick={handleSubmitData}
          className="button"
          variant="contained"
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default UserProfile;
