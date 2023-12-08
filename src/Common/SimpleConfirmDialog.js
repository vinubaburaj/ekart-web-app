import {Button, Dialog, DialogTitle} from "@mui/material";

function SimpleConfirmDialog(props) {
  const { onClose, returnValue, open } = props;

  const handleClose = () => {
    onClose(returnValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Are you sure?</DialogTitle>
        <Button color={'error'} onClick={() => handleListItemClick(true)}>Yes</Button>
        <Button onClick={() => handleListItemClick(false)}>No</Button>
      </Dialog>
  );
}

export default SimpleConfirmDialog;