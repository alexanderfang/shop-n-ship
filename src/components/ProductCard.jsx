import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { AddShoppingCart, DeleteForever, RemoveShoppingCart, Storefront } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import Skeleton from 'react-loading-skeleton';

import { addToCart, removeFromCart } from '../store/cart/actions';
import { deleteProduct } from '../store/admin/actions';
import { productCardTypeVariant } from '../configs/consts';

const useStyles = makeStyles(() => ({
    card: {
      minHeight: "100%",
      maxHeight: "100%",
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f4f4f4',
    },
    cardMedia: {
      paddingTop: '100%',
      objectFit: 'cover',
    },
    cardContent: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "row"
    },
}));

export default function ProductCard({variant, product}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const handleActionButton = (e) => {
        e.preventDefault();
        switch (variant) {
            case productCardTypeVariant.PRODUCT:
                dispatch(addToCart(product));
                break;
            case productCardTypeVariant.CART:
                dispatch(removeFromCart(product));
                break;
            case productCardTypeVariant.ADMIN:
                dispatch(deleteProduct(product._id));
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <Card className={classes.card}>
                    <CardMedia className={classes.cardMedia} image={product.image} title={product.name} />
                    <CardContent className={classes.cardContent}>
                        <div style={{ width: "75%" }}>
                            <Typography variant="h6" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                {product.name || <Skeleton />}
                            </Typography>
                            <Typography variant="caption" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", color: "#848484" }}>
                                <Storefront />&nbsp;{product.createdBy || <Skeleton />}
                            </Typography>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#F08888", display: "flex", alignItems: "center" }}>
                                {variant === productCardTypeVariant.CART ? product.quantity+" x " : null}{<NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> || <Skeleton />}
                            </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button onClick={handleActionButton} size="large" color="primary">
                                {variant === productCardTypeVariant.ADMIN 
                                    ? <DeleteForever color="error" />
                                    : variant === productCardTypeVariant.CART 
                                        ? <RemoveShoppingCart color="error" />
                                        : <AddShoppingCart /> 
                                }
                            </Button>
                        </div>
                    </CardContent>
                </Card>
              </Grid>
        </>
    )
}
