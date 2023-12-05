import {Alert, Snackbar} from "@mui/material";

function SnackbarComponent({snackbarOpen, snackbarMsg, severity, vertical, horizontal}) {
  return (
      <Snackbar
          anchorOrigin={{vertical: vertical, horizontal: horizontal}}
          open={snackbarOpen}
          transitionDuration={300}
          autoHideDuration={2500}
      >
        <Alert severity={severity}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
  );
}

export default SnackbarComponent;