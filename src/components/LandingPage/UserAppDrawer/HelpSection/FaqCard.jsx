import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import "./FaqCard.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

function FaqCard() {
  const content = [
    {
      id: 1,
      question: "What is Nearby?",
      answer:
        "Nearby is your one stop digital assistant which will help you find doctors near your location or any entered location of your choice. You can also filter doctors in your search based on the speciality and distance from your set location.",
    },
    {
      id: 2,
      question: "How does the app get my location?",
      answer:
        "We ask for the permission to access your GPS location once you enroll on our app and then store it securely in our database so that you can continue using our service without any further hassles whenever you revist the app again.",
    },
    {
      id: 3,
      question:
        "Can I set my location manually instead of setting it to my current GPS location?",
      answer:
        "Yes, we have designed the application in such a way that you are free to choose how you want to share your location. It can be via GPS or can be set manually using our search option on the dashboard.",
    },
    {
      id: 4,
      question: "What is In-Network?",
      answer:
        "In-Network section shows you the doctors who will do the treatment on a cashless basis if visted, i.e. the treatment provided by them is covered under your existing medical insurance plan.",
    },
    {
      id: 5,
      question: "What is Out-Network?",
      answer:
        "Out-Network section shows you the doctors where treatment is not available on a cashless basis, i.e. you will need to pay for the treatment and then apply for any reimbursments with your medical insurance provider.",
    },
  ];
  const [expanded, setExpanded] = useState(null);

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id); 
    // step 2: id of currently clicked card is compared to the expanded value and if they are different i.e for eg intially say null === 1
    //, means 1st card was clicked, null === 1 is false and hence we set the expanded state variale to hold id value 1
  };

  return (
    <>
      {content.map((contentEntry) => (
        <Card key={contentEntry.id} sx={{ maxWidth: "100%", backgroundColor: "#DFF2F3" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="questionText1"
              className="noto-sans-text"
              sx={{ px: 2, py: 1, fontSize: "1.2rem" }}
            >
              {contentEntry.question}
            </Typography>
            <CardActions sx={{ padding: 0 }}>
              <ExpandMore
                expand={expanded === contentEntry.id} // step 3 : here this considering above eg. expression becomes 1 === 1 hence it returns true and card is expanded
                onClick={() => handleExpandClick(contentEntry.id)} // step 1 : onClick sends the id of card to the handler function
                aria-expanded={expanded === contentEntry.id}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          </Box>
          <Collapse
            in={expanded === contentEntry.id}
            timeout="auto"
            unmountOnExit
          >
            <CardContent>
              <Typography id="questionText2" className="noto-sans-text">
                {contentEntry.answer}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </>
  );
}

export default FaqCard;
