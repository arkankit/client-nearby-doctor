import Snackbar from '@mui/material/Snackbar';

export default function AutohideSnackbar({openSnackbar, message, setSnackBarOpen}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}