import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import ProductCard from '../../components/ProductCard';
import useProducts from '../../hooks/useProducts';
import Loading from '../../components/Loading';
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
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

export default function Home() {
    const classes = useStyles();
    const { products, loading } = useProducts();

    return (
      <>
        {loading ? <Loading /> : null}
        <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              {products.map((product) => (
                  <ProductCard 
                      key={product._id} 
                      product={product}
                      variant={productCardTypeVariant.PRODUCT}
                  />
              ))}
            </Grid>
        </Container>
      </>
    );
}
