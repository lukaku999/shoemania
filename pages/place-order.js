import { Button, Card, Grid, List, ListItem, TableContainer, Typography } from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import classes from '../utils/classes'
import { Store } from '../utils/Store'
import {useRouter} from 'next/router'
import CartItems from '../components/CartItems'
import { useSnackbar } from 'notistack'
import dynamic from 'next/dynamic'
import OrderDetails from '../components/OrderDetails'

const PlaceOrder = () => {
    const {state: {user, 
                cart:{cartItems, shippingAddress, paymentMethod, cartItemsAvailability},
                placeOrder
            },  
        dispatch} = useContext(Store)
    
    const router = useRouter()
    const [cartData, setCartData] = useState({cartItems, shippingAddress, paymentMethod})
  
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        console.log(paymentMethod, "stuff") 
        /*if (cartItems.length === 0) {
            router.push('/cart')
        }*/

        if (!shippingAddress) {
            router.push('/shipping')
        } 

        if (!paymentMethod) {
            router.push('/payment')
        } 
    }, [cartItems, shippingAddress, paymentMethod])

    useEffect(() => {
        setCartData({...cartData, cartItems, shippingAddress, paymentMethod})
    }, [cartItems, shippingAddress, paymentMethod])


    
    
    function roundNum(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }

    const itemsPrice = roundNum(cartItems.reduce((a, item) => a + parseFloat(item.price)  * parseInt(item.quantity), 0)) 
    const shippingPrice = roundNum(136)
    const taxPrice = roundNum(itemsPrice * 0.15 ) 
    const totalPrice = roundNum(itemsPrice + shippingPrice + taxPrice)

    const order = {itemsPrice, 
                   shippingPrice, 
                   taxPrice,
                   totalPrice,
                   shippingAddress,
                   paymentMethod,
                   orderStatus: "order placement"}

    const placeOrderHandler = () => {
        
        const isAnyProductOutOfStock = cartItems.some(item =>  cartItemsAvailability.find(product => product._key === item._key).insufficientProduct)
        
        if (isAnyProductOutOfStock) {
            enqueueSnackbar("There are some items out of stock", {variant: 'error'}) 
            return 
        }
        const orderData = {
            cart: {
                prices: {
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice
                },
                cartItems,
                paymentMethod,
                shippingAddress
            },
            user
        }
        placeOrder(orderData, router, enqueueSnackbar, dispatch)
    }

    const buttons = <ListItem>
                        <Button onClick = {placeOrderHandler}
                                variant="contained"
                                color="primary"
                                fullWidth>
                                place order
                        </Button>
                    </ListItem>
    

    return ( 
    cartData.cartItems && cartData.shippingAddress && cartData.paymentMethod &&
    <Layout title="Place Order">
        <CheckoutWizard activeStep = {3}/>
        <Typography component = "h1" variant = "h1">
                Place Order
        </Typography>
        <OrderDetails order = {order} buttons = {buttons}/>
        
    </Layout>
    )
}

export default dynamic(() => Promise.resolve(PlaceOrder), {ssr: false}) 


