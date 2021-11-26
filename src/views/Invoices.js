import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';

const theme = createTheme();

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let status = 'Paid';
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/?_page=1`)
      .then(function (response) {
        setInvoices(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleCancelInvoice = (invoice) => {
    //Dummy
    /*axios
      .put(`https://jsonplaceholder.typicode.com/posts/${invoice.id}`, {
        title: 'Canceled',
      })
      */
    history.push(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
          }}
        >
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              <IconButton aria-label='settings'>
                <Link to='/stats'>
                  <BarChartIcon />
                </Link>
              </IconButton>
              Invoices
              <IconButton aria-label='settings'>
                <Link to='/'>
                  <InventoryIcon />
                </Link>
              </IconButton>
            </Typography>
            <Typography
              component='h3'
              variant='h4'
              align='center'
              color='text.primary'
              gutterBottom
            ></Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align='center'>ID</TableCell>
                  <TableCell align='center'>Products</TableCell>
                  <TableCell align='center'>Status</TableCell>
                  <TableCell align='center'>Final Amount</TableCell>
                  <TableCell align='center'>Cancel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {invoice.title}
                    </TableCell>{' '}
                    <TableCell component='th' scope='row'>
                      {invoice.id}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {invoice.body}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {status}
                    </TableCell>
                    <TableCell align='right'>${invoice.userId}.00</TableCell>
                    <TableCell align='right'>
                      <IconButton
                        aria-label='settings'
                        onClick={() => handleCancelInvoice(invoice)}
                      >
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </main>
    </ThemeProvider>
  );
}
