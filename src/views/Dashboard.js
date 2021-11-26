import { useState, useEffect, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BasicModal from '../components/Modal';
import ModalForm from '../components/ModalForm';
import { Link } from 'react-router-dom';

const theme = createTheme();

export default function Album() {
  const [products, setProducts] = useState([]);
  const [cart, setCarts] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const currentPage = useMemo(
    () => new URLSearchParams(location.search).get('page'),
    [location.search]
  );
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(currentPage ? Number(currentPage) : 1);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/?_page=${currentPage}`)
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const changePage = (newPage) => {
    if (newPage > products.length || newPage === 0) return;

    history.push(`${location.pathname}?page=${newPage}`);
    history.go(0);

    setPage(newPage);
  };

  const handleAddProductToCart = (product) => {
    setTotal(total + product.userId);
    const myCart = [...cart, product];
    setCarts(myCart);
    handleOpen();
  };

  const onAddProduct = (product) => {
    if (!products) {
      setProducts([product]);
    } else {
      setProducts([...products, product]);
    }
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
              <IconButton aria-label='settings' onClick={handleOpen}>
                <ShoppingCartIcon />
              </IconButton>
              Products
              <IconButton aria-label='settings'>
                <Link to='/invoices'>
                  <ReceiptIcon />
                </Link>
              </IconButton>
            </Typography>
            <Typography
              component='h3'
              variant='h4'
              align='center'
              color='text.primary'
              gutterBottom
            >
              <Button
                size='small'
                color='primary'
                onClick={() => handleOpenForm()}
              >
                Add product
              </Button>
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align='right'>Price</TableCell>
                  <TableCell align='right'>Add to Card</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {product.title}
                    </TableCell>
                    <TableCell align='right'>${product.userId}.00</TableCell>
                    <TableCell align='right'>
                      <IconButton
                        aria-label='settings'
                        onClick={() => handleAddProductToCart(product)}
                      >
                        <AddShoppingCartIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <BasicModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            cart={cart}
            total={total}
            setTotal={setTotal}
          />
          <ModalForm
            open={openForm}
            handleClose={handleCloseForm}
            onAddProduct={onAddProduct}
          />
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2rem',
            }}
          >
            <Button
              size='small'
              color='primary'
              onClick={() => changePage(page - 1)}
            >
              Last page
            </Button>
            <Typography component='h4' variant='h4'>
              {page}
            </Typography>
            <Button
              size='small'
              color='primary'
              onClick={() => changePage(page + 1)}
            >
              Next page
            </Button>
          </Box>
        </Container>
      </main>
    </ThemeProvider>
  );
}
