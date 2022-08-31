import { Box, Button, Card, Grid,
        List, ListItem, 
        Table, TableBody, TableCell, 
        TableContainer, TableHead, TableRow, 
        TextField, 
        Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Store } from '../utils/Store'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import classes from '../utils/classes'
import axios from 'axios'
import {useSnackbar} from 'notistack'
import { useEffect } from 'react'
import client from '../utils/client'
import PageLink from '../components/PageLink'
import {useRouter} from 'next/router'

const Cart = () => {
    const {state: {cart: {cartItems}}, dispatch} = useContext(Store)
    const [availableQuantity, setAvailableQuantity] = useState([])
    const {enqueueSnackbar} = useSnackbar()
    const router = useRouter()
    
    
    useEffect(() => {
        verifyProducts()
    }, [cartItems])

    

    const verifyProducts = async() => {
        const cartItemsIDs = cartItems.map(item => item._key)
        try {
            
            const products = await client.fetch(`*[_type == "product" && _id in $ids]`, {ids: cartItemsIDs})
            
            const productAvailability = products.map(product => ({_key: product._id, 
                                                                cartQuantity: cartItems.find(cartItem => cartItem._key === product._id).quantity,
                                                                productQuantity: product.countInStock,
                                                                userQuantityInput: cartItems.find(cartItem => cartItem._key === product._id).quantity,
                                                                insufficientProduct: product.countInStock < cartItems.find(cartItem => cartItem._key === product._id).quantity
                                    }))
            setAvailableQuantity(productAvailability)
          }
          catch (err) {
            
          }
    }
    
     
    
    const updateCart = async (item, quantity) => {
       
        try {
            const {data} = await axios.get(`/api/products/${item._key}`)
            
            dispatch({type: 'CART_ADD_ITEM', payload: {
                _key: item._key,
                name: item.name,
                countInStock: item.countInStock,
                slug: item.slug,
                price: item.price,
                image: item.image,
                quantity
            }})
            
            //enqueueSnackbar(`${item.name} updated to cart`, {variant: 'success'})
        }
        catch {
            enqueueSnackbar('Something went wrong', {variant: 'error'})
        }
                
    }

    const removeItem = async (item) => {
        dispatch({type: 'CART_REMOVE_ITEM', payload: item})
    }
   
    return (
        <Layout title = "Shopping Cart">
            <Typography variant = "h1" component = "h1">
                Shopping Cart
            </Typography>
            {cartItems.length === 0 ? <Box>
                                        <Typography>
                                            Cart is empty <PageLink href = "/">Go Shopping</PageLink>
                                        </Typography>
                                      </Box>
                                    : <Grid container spacing = {2} justifyContent = "space-between">
                                        <Grid item md = {9} xs = {12}>
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align = "center">Image</TableCell>
                                                            <TableCell align = "center">Name</TableCell>
                                                            <TableCell align = "center">Quantity</TableCell>
                                                            <TableCell align = "center">Price {'(per item)'}</TableCell>
                                                            <TableCell align = "center">Action</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {cartItems.map(item => <TableRow key = {item._key}>
                                                                                    <TableCell align = "center">
                                                                                        <PageLink href={`/product/${item.slug}`}>
                                                                                                <Image src = {item.image}
                                                                                                    alt = {item.name}
                                                                                                    width = {50}
                                                                                                    height = {50}
                                                                                                />
                                                                                        </PageLink>
                                                                                    </TableCell>
                                                                                    <TableCell align = "center">
                                                                                        <PageLink href={`/product/${item.slug}`}>                                                                  
                                                                                                <Typography>{item.name}</Typography>
                                                                                        </PageLink>
                                                                                    </TableCell>
                                                                                    <TableCell  align = "center">
                                                                                    
                                                                                    <TextField                                                                                     
                                                                                        value={item.quantity}
                                                                                        size = "medium"
                                                                                        sx = {classes.quantityTextField}
                                                                                        onChange = {e => updateCart(item, e.target.value)}
                                                                                        type="number"
                                                                                        color="primary"
                                                                                        error = {availableQuantity.length > 0  && availableQuantity.find(product => product._key === item._key).insufficientProduct}
                                                                                        helperText = {availableQuantity.length > 0  && `${availableQuantity.find(product => product._key === item._key).productQuantity} left` 
                                                                                                     }
                                                                                        InputLabelProps={{
                                                                                            shrink: true,
                                                                                        }}
                                                                                        >
                                                                                        {item.quantity}
                                                                                    </TextField>
                                                                                                                                                                              
                                                                                    </TableCell >
                                                                                    <TableCell  align = "center">R{item.price.toFixed(2)}</TableCell>
                                                                                    <TableCell  align = "center">
                                                                                        <Button variant = "contained"
                                                                                                color = "secondary"
                                                                                                onClick = {() => removeItem(item)}>
                                                                                                    X
                                                                                        </Button>
                                                                                    </TableCell>
                                                                                </TableRow>)}
                                                    </TableBody>    
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid item md = {3} xs = {12}>
                                            <Card>
                                                <List>
                                                    <ListItem>
                                                        <Typography variant="h2">
                                                            Subtotal {cartItems.reduce((a, item) => a + parseInt(item.quantity), 0)} items : R{cartItems.reduce((a, item) => a + parseFloat(item.price)  * parseInt(item.quantity), 0).toFixed(2)}

                                                        </Typography>
                                                    </ListItem>
                                                    <ListItem>
                                                        <Button fullWidth
                                                                color="primary"
                                                                onClick = {() => {router.push('/shipping')}}
                                                                variant="contained">
                                                                    Checkout
                                                        </Button>
                                                    </ListItem>
                                                </List>
                                            </Card>
                                        </Grid>
                                      </Grid>
            }
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(Cart), {ssr: false})