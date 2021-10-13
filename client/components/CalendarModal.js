import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

export default function CalendarModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
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
      {/* the modal is there in the middle of page, but you cannot manipulate style so it's hard to see */}
        <Fade in={open} sx={{
          color: 'red',
        }}>
            <div>
                <h2>Animated React Modal</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim.
                </p>
            </div>
        </Fade>
    </Modal>
  </>
}