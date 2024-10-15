import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Tooltip,
  InputAdornment,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { userDetailsGetter } from "../../../../Contexts/UserDetailsContext";
import useDebounce from "../../Utility/useDebounce";
import validateUserNamePwd from "./Utility/validateUserNamePwd";

function AccountSection() {
  const { userData } = userDetailsGetter(); // using the context hook to get access to the users context data
  const { updateUserName, updatePwd } = userDetailsGetter(); // using the context hook to set new users context data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [existingUsername, setExistingUsername] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");
  const debouncedInput = useDebounce(passwordCopy, 1000); // sending 2000 ms delay i.e. if user stops typing for 2 second then make places api call
  const [showPassword, setShowPassword] = useState(false);
  const [unameEditable, setUNameEditable] = useState(false);
  const [enableResetPwd, setEnableResetPwd] = useState(false);
  const [enableSecondResetPwd, setEnableSecondResetPwd] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [submitButtondisabled, setSubmitButtonDisabled] = useState(true);
  const [valuesEntered, setValuesEntered] = useState(false);
  const [resultant, setResultant] = useState({});

  const navigate = useNavigate();

  function handleClickShowPassword() {
    setShowPassword((prevValue) => {
      return !prevValue;
    });
  }

  function handleUNEditClick() {
    setUNameEditable(true);
  }

  async function handleSubmitData() {
    const resultObject = await validateUserNamePwd(
      unameEditable,
      enableResetPwd,
      username,
      password,
      existingPassword,
      existingUsername
    );
    setResultant(resultObject);
  }

  useEffect(() => {
    if (resultant) {
      
    }
  }, [resultant]);

  useEffect(() => {
    if (userData) {
      setExistingUsername(userData.userName);
      setUsername(userData.userName);
      setExistingPassword(userData.pwd);
    }
  }, [userData]);

  useEffect(() => {
    if (password !== "" && debouncedInput !== "") {
      if (debouncedInput === password) {
        setFeedbackMessage("Passwords match");
      } else {
        setFeedbackMessage("Passwords don't match");
      }
    }
    if (valuesEntered && enableResetPwd) {
      if (valuesEntered && (password === "" || debouncedInput === "")) {
        setFeedbackMessage("Password fields can't be empty");
      }
    }
    if (valuesEntered && username === "") {
      setFeedbackMessage("Username can't be empty");
      setTimeout(() => {
        setFeedbackMessage("");
      },2000);
    }
  }, [debouncedInput, password, username]);

  useEffect(() => {
    if (unameEditable) {
      setSubmitButtonDisabled(false);
      if (enableResetPwd) {
        if (feedbackMessage !== "Passwords match") {
          setSubmitButtonDisabled(true);
        } else {
          setSubmitButtonDisabled(false);
        }
      }
    } else {
      if (enableResetPwd) {
        if (feedbackMessage !== "Passwords match") {
          setSubmitButtonDisabled(true);
        } else {
          setSubmitButtonDisabled(false);
        }
      }
    }
  }, [unameEditable, enableResetPwd, feedbackMessage]);
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
        Account Details
      </Typography>
      <Box>
        <TextField
          className="noto-sans-text"
          type="text"
          focused={true}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setValuesEntered(true);
          }}
          required
          disabled={!unameEditable}
        />
        <IconButton
          style={{ width: "fit-content", margin: "0.3em 3%" }}
          onClick={handleUNEditClick}
          aria-label="edit"
          disabled={unameEditable}
        >
          <Tooltip title="Click to edit User Name" position="top">
            <EditIcon />
          </Tooltip>
        </IconButton>
      </Box>
      <Box>
        {!enableResetPwd ? (
          <Button
            onClick={() => {
              setEnableResetPwd(true);
            }}
            className="button"
            variant="contained"
          >
            Reset Password
          </Button>
        ) : (
          <TextField
            className="noto-sans-text"
            type="password"
            id="outlined-basic"
            label="New password"
            variant="outlined"
            onChange={(e) => {
              setEnableSecondResetPwd(true);
              setPassword(e.target.value);
              setValuesEntered(true);
            }}
            required
          />
        )}
        {enableSecondResetPwd && (
          <TextField
            sx={{ margin: "0 5%" }}
            className="noto-sans-text"
            type={showPassword ? "text" : "password"}
            id="outlined-basic"
            label="Confirm new Password"
            variant="outlined"
            onChange={(e) => {
              setPasswordCopy(e.target.value);
            }}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
        {feedbackMessage === "" ? null : (
          <Typography
            sx={{ marginTop: "1em" }}
            align="left"
            justifyContent="unset"
            color={
              feedbackMessage === "Passwords match" ? "#008000" : "#ff0000"
            }
            variant="h6"
            className="noto-sans-text"
          >
            {feedbackMessage}
          </Typography>
        )}
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
          disabled={submitButtondisabled}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default AccountSection;
