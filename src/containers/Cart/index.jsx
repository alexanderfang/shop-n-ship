import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';

import ProductCard from '../../components/ProductCard';
import { checkout } from '../../store/cart/actions';
import { productCardTypeVariant } from '../../configs/consts';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    footer: {
      backgroundColor: "#ffa332",
      fontSize: "20px",
      color: "#fff",
      borderTop: "1px solid #ffa332",
      textAlign: "center",
      padding: "20px",
      position: "fixed",
      left: "0",
      bottom: "0",
      height: "8vh",
      width: "100%",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    footerBlock: {
      display: "block",
      padding: "20px",
      height: "60px",
      width: "100%"
    }
  }));

export default function Cart() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
    const carts = useSelector((state) => state.cartReducer.cart);
    const total = useSelector((state) => state.cartReducer.total);

    function Footer({ children }) {
      return (
        <div>
          <div className={classes.footerBlock} />
          <div className={classes.footer}>{children}</div>
        </div>
      );
    }

    const handleCheckout = () => {
      if(isLoggedIn){
        dispatch(checkout());
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'You have to login to continue',
        }).then((result) => {
          history.push('/login');
        });
      }
    }

    return (
        <>
          <Container className={classes.cardGrid} maxWidth="lg">
              <Grid container spacing={4}>
                {carts.map((cart) => (
                    <ProductCard 
                        key={cart._id} 
                        product={cart}
                        variant={productCardTypeVariant.CART}
                    />
                ))}
              </Grid>
          </Container>
          <Button onClick={handleCheckout}>
            <Footer>
                <Typography variant="h4">
                  Checkout Total: {<NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> || <Skeleton />}
                </Typography>
            </Footer>
          </Button>
        </>
    )
}
