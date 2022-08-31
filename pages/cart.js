import { Box, Button, Card, Grid,
        List, ListItem,
        Typography } from '@mui/material'
import React, { useContext} from 'react'
import { Store } from '../utils/Store'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import PageLink from '../components/PageLink'
import {useRouter} from 'next/router'
import CartItems from '../components/CartItems'

const Cart = () => {
    const {state: {cart: {cartItems}}} = useContext(Store)
    const router = useRouter()
    

   
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
                                            <CartItems items = {cartItems}/>
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