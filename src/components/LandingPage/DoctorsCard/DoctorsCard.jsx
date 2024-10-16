import Card from "@mui/material/Card";
import CallIcon from "@mui/icons-material/Call";
import { IconButton, Box, Button, Typography, Link } from "@mui/material";
import { Tooltip } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import UserToDoctorMap from "../UserToDoctorMap/UserToDoctorMap";
import { useState } from "react";
import Modal from "@mui/material/Modal";

function DoctorsCard({ doctors, userAddr, isLoaded }) {
  const style = {
    position: "absolute",
    top: "50%", // sets the modal top to 50 percent of vh
    left: "50%", // sets the modal left edge to 50 percent of the width of containing box
    transform: "translate(-50%, -50%)", // this moves the modal to 50 percent of its own width, making it appear in center, as the top and left parameters used the edge for positioning and not the center of the modal.
    width: "25em",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };

  const [showDirToDoctor, setShowDirToDoctor] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  function handleCallIconClick() {
    setOpenModal(true);
  }

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {doctors.doc_speciality}
          </Typography>
          <Typography variant="h5" component="div">
            {doctors.doc_name}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Rating: {doctors.doc_rating} ({doctors.number_of_reviews})
          </Typography>
          <Typography variant="body2">{doctors.doc_address}</Typography>
        </CardContent>
        <CardActions>
          <IconButton
            style={{ width: "fit-content", margin: "0.3em 3%" }}
            aria-label="call"
            onClick={handleCallIconClick}
          >
            <Tooltip title="Click to book appointment" position="top">
              <CallIcon />
            </Tooltip>
          </IconButton>
          <Button
            disabled={disableButton}
            onClick={() => {
              setShowDirToDoctor(true);
              setDisableButton(true);
            }}
          >
            Show directions
          </Button>
        </CardActions>
      </Card>
      {showDirToDoctor && (
        <UserToDoctorMap
          isLoaded={isLoaded}
          userLoc={{ lat: userAddr.latitude, lng: userAddr.longitude }}
          docLoc={{ lat: doctors.doc_lat, lng: doctors.doc_long }}
        />
      )}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Call doctor
          </Typography>
          <br></br>
          <CallIcon fontSize="small" />
          <Link
            sx={{ mx: 1 }}
            href={`tel:${doctors.doc_phone_no}`}
            variant="inherit"
          >
            {doctors.doc_phone_no.replace(/\s+/g, "")}
          </Link>
        </Box>
      </Modal>
    </div>
  );
}

export default DoctorsCard;
