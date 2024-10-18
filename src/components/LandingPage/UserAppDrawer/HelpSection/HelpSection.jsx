import { Box, Typography, Link, Button, CircularProgress } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import { useNavigate } from "react-router-dom";
import checkSession from "../../Utility/checkSession";
import { useEffect, useState } from "react";
import FaqCard from "./FaqCard";

function HelpSection() {
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "-5% 10%",
          width: "50%",
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
          Help Center
        </Typography>
        <Box>
          <Typography
            align="left"
            justifyContent="unset"
            variant="h5"
            className="noto-sans-text"
            sx={{ marginBottom: "0.5em" }}
          >
            <EmailIcon fontSize="large" />
          </Typography>
          <Link href="mailto:rajkaushalankit@gmail.com" variant="inherit" underline="hover">
            rajkaushalankit@gmail.com
          </Link>
        </Box>
        <Box>
          <Typography
            align="left"
            justifyContent="unset"
            variant="h5"
            className="noto-sans-text"
            sx={{ marginBottom: "0.5em" }}
          >
            <CallIcon fontSize="large" />
          </Typography>
          <Link href="tel:7488807971" variant="inherit" underline="hover">
            7488807971
          </Link>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{ marginTop: "6rem" }}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "-5% 5%",
          width: "100%",
          padding: "25vh 0",
        }}
      >
        <Typography
          align="left"
          justifyContent="unset"
          variant="h4"
          className="noto-sans-text"
          sx={{ marginTop: "0.8em", padding: "1em 0" }}
        >
          FAQs
        </Typography>
        <FaqCard />
      </Box>
    </Box>
  );
}

export default HelpSection;
