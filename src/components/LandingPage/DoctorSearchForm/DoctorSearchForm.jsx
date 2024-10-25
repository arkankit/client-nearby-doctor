import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { LoadScript } from "@react-google-maps/api";
import getDoctorsBySpeciality from "../Utility/getDoctorsBySpeciality";
import axios from "axios";
import DoctorsCard from "../DoctorsCard/DoctorsCard";
import "../../Signup/Signup.css";
import "./DoctorSearchForm.css";

function DoctorSearchForm({ addressOfUser }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const speciality = [
    { id: 1, specialityName: "General practitioner" },
    { id: 2, specialityName: "Doctor" },
    { id: 3, specialityName: "Diabetologist" },
    { id: 4, specialityName: "Homeopath" },
    { id: 5, specialityName: "Medical clinic" },
    { id: 6, specialityName: "Pulmonologist" },
    { id: 7, specialityName: "Surgeon" },
    { id: 8, specialityName: "Dermatologist" },
    { id: 9, specialityName: "ENT Specialist" },
    { id: 10, specialityName: "Pediatrician" },
    { id: 11, specialityName: "Orthopedic surgeon" },
    { id: 12, specialityName: "Pharmacy" },
    { id: 13, specialityName: "Hospital" },
    { id: 14, specialityName: "Urology clinic" },
    { id: 15, specialityName: "Urologist" },
    { id: 16, specialityName: "Gynecologist" },
    { id: 17, specialityName: "General hospital" },
    { id: 18, specialityName: "Obstetrician-gynecologist" },
    { id: 19, specialityName: "Private hospital" },
    { id: 20, specialityName: "Psychiatrist" },
    { id: 21, specialityName: "Medical Center" },
    { id: 22, specialityName: "Occupational medical physician" },
    { id: 23, specialityName: "Medical diagnostic imaging center" },
    { id: 24, specialityName: "Endocrinologist" },
  ];

  const [chosenSpeciality, setChosenSpeciality] = useState("");
  const [chosenDistance, setChosenDistance] = useState(0);
  const [show, setShow] = useState(false);
  const [distanceFilteredDoctors, setDistanceFilteredDoctors] = useState([]);
  const [inNetworkDocs, setInNetworkDocs] = useState([]);
  const [outNetworkDocs, setOutNetworkDocs] = useState([]);
  const [showDoctors, setShowDoctors] = useState(false);
  const [userPlanCode, setUserPlanCode] = useState("");
  const [doneFilteringByDistance, setDoneFilteringByDistance] = useState(false);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);

  async function getFilteredDoctors() {
    setShowLoadingIcon(true);
    setInNetworkDocs([]);
    setOutNetworkDocs([]);
    setDistanceFilteredDoctors([]);
    setDoneFilteringByDistance(false);
    const filteredDoctorsBySpeciality = await getDoctorsBySpeciality(
      chosenSpeciality
    );
    if (filteredDoctorsBySpeciality.length > 0) {
      console.log("calling get distances function");
      await getDistances(filteredDoctorsBySpeciality);

      /*const filteredByDistance = */
    }
  }

  useEffect(() => {
    if (doneFilteringByDistance) {
      for (const doc of distanceFilteredDoctors) {
        const docPlanCode = doc.vendor_id_map;
        if (docPlanCode.includes(userPlanCode)) {
          setInNetworkDocs((prevItems) => [...prevItems, doc]);
        } else {
          setOutNetworkDocs((prevItems) => [...prevItems, doc]);
        }
      }
      setShowLoadingIcon(false);
      setShowDoctors(true);
    }
  }, [doneFilteringByDistance]);

  async function getUserPlanCode() {
    try {
      const response = await axios.get("https://server-nearby-doctor-production.up.railway.app/getDetails", {
        withCredentials: true,
      });
      if (response.data !== null) {
        setUserPlanCode(response.data.user_plan_code);
      }
    } catch (err) {
      console.log("Error fetching user's plan code:", err);
    }
  }

  async function getDistances(filteredDoctorsBySpeciality) {
    if (userPlanCode === "") {
      await getUserPlanCode();
    }

    const userLat = +addressOfUser.latitude;
    const userLong = +addressOfUser.longitude; // getting users latitude and longitude

    for (const doc of filteredDoctorsBySpeciality) {
      // for..in loop will have doc as index so using for...of where doc is each element of array
      const docLat = +doc.doc_lat; // getting each doctors latitude and longitude
      const docLong = +doc.doc_long;
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/route/v1/driving/${userLong},${userLat};${docLong},${docLat}?overview=false`
        );
        if (response.data.code !== null && response.data.code === "Ok") {
          const distanceFromUser = Math.floor(
            response.data.routes[0].legs[0].distance / 1000
          ); // rounding to kilometers from meters
          if (distanceFromUser <= chosenDistance) {
            setDistanceFilteredDoctors((prevItems) => [...prevItems, doc]);
          }
        }
      } catch (err) {
        console.log("Error contacting OSRM server:", err);
      }
    }
    setDoneFilteringByDistance(true);
  }

  useEffect(() => {
    if (addressOfUser) setShow(true);
  }, [addressOfUser]);

  const onLoad = () => {
    // this tells the children component USerToDoctorMap that LoadScript is loaded and ready
    setIsLoaded(true);
  };

  return (
    <div>
      <Box
        className="signup-box-doc-search slide-in-fade"
        style={{marginTop : "5em"}}
        component="form"
        sx={{ "& > :not(style)": { my: 2, mx: "auto", width: "35ch" } }}
        noValidate
        autoComplete="off"
      >
        <h1 className="noto-sans-text" style={{marginBottom: "2em"}}>
          Search doctors filtered on speciality and distance
        </h1>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Speciality</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chosenSpeciality}
            label="Doctor Speciality"
            onChange={(e) => {
              setChosenSpeciality(e.target.value);
            }}
          >
            {speciality.map((specialityItem) => (
              <MenuItem
                key={specialityItem.id}
                value={specialityItem.specialityName}
              >
                {specialityItem.specialityName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className="noto-sans-text"
          type="text"
          id="outlined-basic-distance"
          label="Distance (Kms)"
          variant="outlined"
          onChange={(e) => {
            setChosenDistance(e.target.value);
          }}
          required
        />
        {show && (
          <Button
            disableRipple
            onClick={getFilteredDoctors}
            className="button"
            variant="contained"
          >
            Find nearby doctors
          </Button>
        )}
        {showLoadingIcon && (
          <CircularProgress size={80} style={{ margin: "0 45%" }} />
        )}
      </Box>
      {/*Since LoadScript can be loaded only once, 
      Added LoadScript here as the UserToDoctorMap would load it multiple times on each call and that would throw an error*/}
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        onLoad={onLoad}
      >
        <Box className="doctors-cards" sx={{ "& > :not(style)": { my: 2 } }}>
          {showDoctors && (
            <Typography
              style={{ fontWeight: "bold" }}
              variant="h5"
              className="noto-sans-text"
            >
              In-Network Doctors
            </Typography>
          )}
          {showDoctors &&
            inNetworkDocs.map((doctor) => (
              <DoctorsCard
                key={doctor.doctorid}
                doctors={doctor}
                userAddr={addressOfUser}
                isLoaded={isLoaded}
              />
            ))}
          {showDoctors && (
            <Typography
              style={{ fontWeight: "bold" }}
              variant="h5"
              className="noto-sans-text"
            >
              Out-Network Doctors
            </Typography>
          )}
          {showDoctors &&
            outNetworkDocs.map((doctor) => (
              <DoctorsCard
                key={doctor.doctorid}
                doctors={doctor}
                userAddr={addressOfUser}
                isLoaded={isLoaded}
              />
            ))}
        </Box>
      </LoadScript>
    </div>
  );
}

export default DoctorSearchForm;
