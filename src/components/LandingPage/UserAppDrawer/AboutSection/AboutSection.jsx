import { Box, Typography, Button } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import checkSession from "../../Utility/checkSession";
import { useState, useEffect } from "react";

function AboutSection() {
  const [navigateLink, setNavigateLink] = useState("");
  const navigate = useNavigate();

  async function checkActiveSession() {
    const sessionActive = await checkSession();
    if (sessionActive) {
      console.log("Session active, back button set to landing");
      setNavigateLink("/landing");
    } else {
      console.log("Session inactive, back button set to homepage");
      setNavigateLink("/");
    }
  }

  useEffect(() => {
    checkActiveSession();
  }, []);

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
        About Us
      </Typography>
      <Typography
        align="left"
        justifyContent="unset"
        variant="body1"
        className="noto-sans-text"
      >
        Discover the healthcare you need with our app that connects you to
        nearby doctors instantly. Search for specialists based on your location
        and doctors speciality. Check reviews, availability and book
        appointments with one click. Your path to better health starts right at
        your fingertips!
      </Typography>
      <Typography
        align="left"
        justifyContent="unset"
        variant="body1"
        className="noto-sans-text"
        sx={{ marginTop: "-1em" }}
      >
        Follow us on Twitter and facebook for news about exciting updates!
      </Typography>
      <Box>
        <IconButton
          style={{ width: "fit-content", margin: "0.3em 3%" }}
          component="a"
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FacebookIcon sx={{ fontSize: "2em" }} />
        </IconButton>
        <IconButton
          style={{ width: "fit-content", margin: "0.3em 3%" }}
          component="a"
          href="https://www.x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <XIcon sx={{ fontSize: "1.6em" }} />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", marginTop: "4em" }}>
        <Button
          onClick={() => {
            navigate(`${navigateLink}`);
          }}
          className="button"
          variant="contained"
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
}

export default AboutSection;
