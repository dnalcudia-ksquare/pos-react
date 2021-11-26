import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function BasicModal(props) {
  const { open, handleClose, cart, setTotal, total } = props;
  const [returnValue, setReturnValue] = useState(0);
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  const handleDeleteProduct = (id) => {
    setTotal(total - 1);
    const productIndex = cart.findIndex((product) => product.id == id);
    cart.splice(productIndex, 1);
    handleClose();
  };

  const handleReturnValue = (payment) => {
    console.log(payment);
    setReturnValue(payment - total);
  };

  function extractValue(arr, prop) {
    // extract value from property
    let extractedValue = arr.map((item) => item[prop]);

    return extractedValue;
  }

  const handleCheckOut = () => {
    // passing an array of objects and property 'a' to extract
    const products = extractValue(cart, 'title');
    axios
      .post('/', {
        date: Date.now(),
        products: products,
        status: 'Paid',
        total: total,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpenSnack(true);
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
            Your Cart
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align='right'>Price</TableCell>
                  <TableCell align='right'>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((product) => (
                  <TableRow
                    key={product.title}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>{product.title[0]}</TableCell>
                    <TableCell align='right'>${product.userId}.00</TableCell>
                    <TableCell align='right'>
                      <IconButton
                        aria-label='settings'
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Typography
            component='h3'
            variant='h3'
            align='left'
            color='text.primary'
            gutterBottom
          >
            Total: ${total}.00
          </Typography>
          <Box>
            <TextField
              fullWidth
              id='clientPayment'
              label='Client Payment'
              variant='standard'
              type='number'
              placeholder='10'
              defaultValue={total}
              onChange={(e) => handleReturnValue(e.target.value)}
            />
            <Typography
              component='h3'
              variant='h6'
              align='left'
              color='text.primary'
              gutterBottom
            >
              Return: ${returnValue}.00
            </Typography>
          </Box>
          <br />
          <Button variant='contained' onClick={handleCheckOut}>
            Check out
          </Button>
          <Snackbar
            open={openSnack}
            autoHideDuration={3000}
            onClose={handleCloseSnack}
          >
            <Alert
              onClose={handleCloseSnack}
              severity='success'
              sx={{ width: '100%' }}
            >
              Purchase registered!
            </Alert>
          </Snackbar>
          <br />
        </Box>
      </Modal>
    </div>
  );
}
