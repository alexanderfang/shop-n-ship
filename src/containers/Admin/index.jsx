import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
// import useAdminProducts from '../../hooks/useAdminProducts';
import Loading from '../../components/Loading';
import { addProduct, loadProduct } from '../../store/admin/actions';
import ProductCard from '../../components/ProductCard';
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
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
  }));

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function Admin() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const products = useSelector(state => state.adminReducer.products);
    const { loading } = useSelector(state => state.adminReducer.isLoading);
    const [productName, setProductName] = useState(null);
    const [productDescription, setProductDescription] = useState(null);
    const [productPrice, setProductPrice] = useState(0);
    const [productImage, setProductImage] = useState(null);
    const loadNet = useSelector(state => state.adminReducer.isLoading);

    useEffect(() => {
      dispatch(loadProduct());
    }, [dispatch]);

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(
        addProduct(productName, productDescription, productPrice, productImage)
        ).then(() => {
          dispatch(loadProduct());
          setOpenModal(false);
        });
    }
    
    return (
      <>
          {loading || loadNet ? <Loading /> : null}
            <Container className={classes.cardGrid} maxWidth="lg">
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 30, }}>
                  <Typography variant="h4" style={{ fontWeight: "bold" }}>
                      Your Products
                  </Typography>
                  <div>
                  <Button variant="contained" onClick={() => setOpenModal(true)} color="primary" size="large" style={{ backgroundColor: "#ffa332" }}>Add Product</Button>
                  <Modal isOpen={openModal} onRequestClose={() => setOpenModal(false)} style={customStyles} ariaHideApp={false} contentLabel="Add Product Modal">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <h2>Add New Product</h2>
                      <Button onClick={() => setOpenModal(false)}>X</Button>
                    </div>
                    <form className={classes.form} onSubmit={handleSubmit}>
                      <TextField variant="outlined" margin="normal" required fullWidth label="Product Name" onChange={(e) => setProductName(e.target.value)} autoFocus style={{ borderColor: "#ffa332" }} />
                      <TextField variant="outlined" margin="normal" required fullWidth label="Product Description" onChange={(e) => setProductDescription(e.target.value)} />
                      <TextField variant="outlined" margin="normal" required fullWidth label="Price" onChange={(e) => setProductPrice(e.target.value)} />
                      <TextField variant="outlined" margin="normal" required fullWidth label="Product Image" onChange={(e) => setProductImage(e.target.value)} />
                      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                          Add New Product
                      </Button>
                    </form>
                  </Modal>
                </div>
              </div>
              <Grid container spacing={4}>
                  {products.map((product) => (
                      <ProductCard 
                          key={product._id} 
                          product={product}
                          variant={productCardTypeVariant.ADMIN}
                      />
                  ))}
              </Grid>
            </Container>
        </>
    );
}