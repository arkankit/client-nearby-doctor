import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./../../../Signup/Signup.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import "./../../../BasicDetails/BasicDetails.css";
import "./UserProfile.css";
import { userDetailsGetter } from "../../../../Contexts/UserDetailsContext"; // importing the context hook to access the user data set by landing page
import axios from "axios";
import AutohideSnackbar from "./Feedback/AutohideSnackbar";
import checkSession from "../../Utility/checkSession";

function UserProfile() {
  const { userData } = userDetailsGetter(); // using the context hook to get access to the users context data
  const { setUserData } = userDetailsGetter(); // using the context hook to set new users context data
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [insurerCode, setInsurerCode] = useState("");
  const [fnameNotEditable, setFNameNotEditable] = useState(true);
  const [lnameNotEditable, setLNameNotEditable] = useState(true);
  const [planDropdownDisable, setPlanDropdownDisable] = useState(true);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [logout, setLogout] = useState(false);

  async function checkActiveSession() {
    const sessionActive = await checkSession();
    if (!sessionActive) {
      console.log("No active session found, redirecting to login!");
      setLogout(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  const navigate = useNavigate();

  function handleFNEditClick() {
    setFNameNotEditable(false);
  }

  function handleLNEditClick() {
    setLNameNotEditable(false);
  }

  function handlePlanEditClick() {
    setPlanDropdownDisable(false);
  }

  async function handleSubmitData() {
    if (
      firstName !== userData.firstName ||
      lastName !== userData.lastName ||
      insurerCode !== userData.planCode
    ) {
      try {
        const response = await axios.post(
          "http://localhost:3000/details",
          { firstName, lastName, insurerCode },
          { withCredentials: true }
        );

        if (response.data.saved) {
          // update the context data
          const usersNewData = {
            firstName: firstName,
            lastName: lastName,
            address: userData.address,
            planCode: insurerCode,
          };
          setUserData(usersNewData);
          localStorage.setItem("userData", JSON.stringify(usersNewData)); // to make data persist on user triggered page reloads
          //trigger snackbar to show updated message and fields
          setMessage("Updated details successfully");
          setSnackBarOpen(true);
          // disable all inputs again
          setFNameNotEditable(true);
          setLNameNotEditable(true);
          setPlanDropdownDisable(true);
        }
      } catch (err) {
        console.log("Error saving new details of user:", err);
      }
    } else {
      setSnackBarOpen(true);
      // disable all inputs again
      setFNameNotEditable(true);
      setLNameNotEditable(true);
      setPlanDropdownDisable(true);
      setMessage("Data entered already exists, ignoring any update");
    }
  }

  useEffect(() => {
    checkActiveSession();
    if (userData) {
      setFirstname(userData.firstName);
      setLastname(userData.lastName);
      setInsurerCode(userData.planCode);
    }
  }, [userData]);

  return (
    <>
      {logout ? (
        <div id="logout-animate">
          <CircularProgress />
        </div>
      ) : (
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
              focused={true}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              required
              disabled={fnameNotEditable}
            />
            <IconButton
              style={{ width: "fit-content", margin: "0.5em auto" }}
              onClick={handleFNEditClick}
              aria-label="edit"
            >
              <Tooltip title="Click to edit First Name" position="top">
                <EditIcon />
              </Tooltip>
            </IconButton>
            <TextField
              className="noto-sans-text"
              type="text"
              id="outlined-basic"
              label="Last Name"
              focused={true}
              variant="outlined"
              value={lastName}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              required
              disabled={lnameNotEditable}
            />
            <IconButton
              style={{ width: "fit-content", margin: "0.5em auto" }}
              onClick={handleLNEditClick}
              aria-label="edit"
            >
              <Tooltip title="Click to edit Last Name" position="top">
                <EditIcon />
              </Tooltip>
            </IconButton>
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormControl fullWidth>
              <InputLabel
                sx={{ paddingTop: "1em" }}
                id="demo-simple-select-label"
              >
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
                disabled={planDropdownDisable}
              >
                <MenuItem value="tata_aig">TATA AIG</MenuItem>
                <MenuItem value="manipal_cig">MANIPAL CIGNA </MenuItem>
                <MenuItem value="reliance_gen">RELIANCE GENERAL</MenuItem>
                <MenuItem value="hdfc_ergo">HDFC ERGO</MenuItem>
                <MenuItem value="map_bupa">MAX BUPA</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              style={{ margin: "0.5em 7%", justifySelf: "left" }}
              onClick={handlePlanEditClick}
              aria-label="edit"
            >
              <Tooltip title="Click to enable dropdown" position="top">
                <EditIcon />
              </Tooltip>
            </IconButton>
          </Box>
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
              disabled={
                fnameNotEditable && lnameNotEditable && planDropdownDisable
              }
            >
              Save Changes
            </Button>
          </Box>
          <AutohideSnackbar
            openSnackbar={snackbarOpen}
            message={message}
            setSnackBarOpen={setSnackBarOpen}
          />
        </Box>
      )}
    </>
  );
}

export default UserProfile;
