import "./HomePage.css";
import HomePageHeader from "./HomePageHeader";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    function redirectToSignup(){
        navigate("/signup");
    }

    function redirectToLogin(){
        navigate("/login");
    }


  return (
    <div>
      <div id="homepage-container">
        <HomePageHeader />
        <div id="homepage-text-div" className="slide-in-fade"
          style={{
            margin: "15rem 10rem",
            width: "34em",
          }}
        >
          <Typography
            id="heading-text"
            sx={{ transform: "scaleY(1.2)", display: "inline-block" }}
            variant="h3"
            className="dm-serif-text-regular"
          >
            Making Health Care Better Together
          </Typography>
          <Typography
            id="heading-subtext"
            sx={{
              marginTop: "3em",
              transform: "scaleY(1.2)",
              display: "inline-block",
              opacity: "0.9",
            }}
            variant="body2"
            className="dm-serif-text-regular"
          >
            Our application helps you find doctors around your location. You can
            filter them based on distance & speciality all at one place.
          </Typography>
          <Button
            id="signup-button"
            className="button"
            variant="contained"
            onClick={redirectToSignup}
            style={{ width: "10em", marginTop: "2em" }}
          >
            Signup
          </Button>
          <Button
            id="login-button"
            className="button"
            variant="contained"
            onClick={redirectToLogin}
            style={{
              width: "10em",
              marginTop: "2em",
              marginLeft: "4em",
              backgroundColor: "transparent",
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
