import { Box, Typography, Link, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import { useNavigate } from "react-router-dom";

function HelpSection() {
  const navigate = useNavigate();
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
        <Link href="mailto:rajkaushalankit@gmail.com" variant="inherit">
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
        <Link href="tel:7488807971" variant="inherit">
          7488807971
        </Link>
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
      </Box>
    </Box>
  );
}

export default HelpSection;
