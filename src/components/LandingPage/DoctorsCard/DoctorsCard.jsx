import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserToDoctorMap from '../UserToDoctorMap/UserToDoctorMap';
import { useState } from 'react';

function DoctorsCard({doctors, userAddr, isLoaded}) {

  const [showDirToDoctor, setShowDirToDoctor] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  return (
    <div>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {doctors.doc_speciality}
        </Typography>
        <Typography variant="h5" component="div">
        {doctors.doc_name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Rating: {doctors.doc_rating} ({doctors.number_of_reviews})</Typography>
        <Typography variant="body2">
          {doctors.doc_address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" disabled={disableButton} onClick={() => {
          setShowDirToDoctor(true);
          setDisableButton(true);
        }}>Show directions</Button>
      </CardActions>
    </Card>
    {showDirToDoctor && <UserToDoctorMap isLoaded={isLoaded} userLoc = {{lat : userAddr.latitude, lng : userAddr.longitude}} docLoc = {{lat : doctors.doc_lat, lng : doctors.doc_long}}/>}
    </div>
  );
}

export default DoctorsCard;