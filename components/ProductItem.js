import React, { useContext } from 'react'
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Rating, Typography} from '@mui/material'

import {imageResize } from '../utils/image'
import classes from '../utils/classes'
import PageLink from './PageLink'
import { Store } from '../utils/Store'
import {useSnackbar} from 'notistack'
import { useRouter } from 'next/router'


const ProductItem = ({product}) => {
  const {state: {cart, addToCart}, dispatch} = useContext(Store)
  const {enqueueSnackbar} = useSnackbar()
  const router = useRouter()
  return (
    <Card sx = {classes.card}>
        <PageLink href = {`/product/${product.slug.current}`}>
            
            <CardActionArea>
                <CardMedia component = "img" 
                           image = {imageResize(product.image, 300, 300)}
                           title = {product.name}
                />
                <CardContent>
                    <Grid container justifyContent="space-between" >
                        <Typography>{product.name}</Typography>
                        <Rating value = {product.rating} readOnly/>    
                    </Grid>                  
                </CardContent>           
               
            </CardActionArea>
        </PageLink>
        <CardActions>
            <Grid container justifyContent="space-between" >
                <Typography>R{product.price}</Typography>
                <Button size="small" 
                        color="primary"
                        onClick={() => addToCart(product, cart, router, enqueueSnackbar, dispatch)}>Add to cart</Button>
            </Grid>
            
        </CardActions>
    </Card>
  )
}

export default ProductItem