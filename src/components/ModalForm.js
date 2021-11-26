import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
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

export default function ModalForm(props) {
  const { open, handleClose, onAddProduct } = props;
  const [nameValue, setName] = useState();
  const [priceValue, setPrice] = useState();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      title: nameValue,
      userId: priceValue,
    });
    setName('');
    setPrice('');
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add a new product
          </Typography>
          <form>
            <TextField
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={nameValue}
              id='productName'
              label='Name'
              variant='standard'
              placeholder='Plátano chiapas'
            />
            <TextField
              fullWidth
              onChange={(e) => setPrice(e.target.value)}
              value={priceValue}
              id='productPrice'
              label='Price'
              variant='standard'
              type='number'
              placeholder='7'
            />
            <br />
            <br />

            <Button
              onClick={handleOnSubmit}
              variant='contained'
              color='success'
            >
              Add product
            </Button>
          </form>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
