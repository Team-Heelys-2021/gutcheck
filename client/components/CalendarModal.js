import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CalendarModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  // TODO - move to SCSS file
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // TODO: prop drill boolean down here, which is prop drilled from journal page
  return <>
    <Button onClick={handleOpen}></Button>
    <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
    <Box sx={modalStyle}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
      {/* <div className='modal_background'></div> */}
      {/* the modal is there in the middle of page, but you cannot manipulate style so it's hard to see */}
        {/* <Fade in={open}>
            <div>
                <h2>Animated React Modal</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim.
                </p>
            </div>
        </Fade> */}
    </Modal>
  </>
}