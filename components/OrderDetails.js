import { Button, Card, Grid, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import classes from '../utils/classes'
import CartItems from './CartItems'
import CartItemTable from './CartItemTable'
import OrderSubmitButton from './OrderSubmitButton'

const OrderDetails = ({order, buttons}) => {

  const {shippingAddress,
            paymentMethod,
            orderItems,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid,
            paidAt,
            isDelivered,
            deliveredAt,
            orderStatus
            } = order

    console.log(isDelivered, "isDelivered")
  return (
    <Grid container spacing = {1}>
            <Grid item md = {9} xs = {12}>
                    <Card sx = {classes.section}>
                        <List>
                            <ListItem>
                                <Typography component = "h2" variant = "h2">
                                    Shipping Address
                                </Typography>
                            </ListItem>
                            <ListItem>
                                {shippingAddress.fullName}, {shippingAddress.address}, {' '}
                                {shippingAddress.city}, {shippingAddress.postalCode}, {' '}
                                {shippingAddress.country}
                            </ListItem>
                            <ListItem>
                                {orderStatus === 'order placement' ? <Button onClick={() => router.push('/shipping')} 
                                                                        variant="contained" 
                                                                        color="secondary">Edit
                                                                    </Button>
                                                                    : isDelivered ? `Status: delivered at ${deliveredAt}`: 'Status: not delivered'                        
                                }
                            </ListItem>
                        </List>
                    </Card>
      
                <Card sx = {classes.section}>
                    <List>
                        <ListItem>
                            <Typography component = "h2" variant = "h2">
                                Payment Method
                            </Typography>
                        </ListItem>
                        <ListItem>
                            {paymentMethod}
                        </ListItem>
                        <ListItem>
                            {orderStatus === 'order placement' ? <Button onClick={() => router.push('/payment')} 
                                                                    variant="contained" 
                                                                    color="secondary">Edit
                                                                 </Button>
                                                                :  isPaid ? `Status: paid at ${paidAt}`: 'Status: not paid'                        
                            }
                            
                        </ListItem>
                    </List>
                </Card>
                <Card sx = {classes.section}>
                    <List>
                        <ListItem>
                            <Typography component = "h2" variant = "h2">
                                Order Items
                            </Typography>
                        </ListItem>
                        <ListItem>
                            {orderStatus === "order placement" ? <CartItems editable = {false}/>
                                                                : <CartItemTable editable = {false}
                                                                                items = {orderItems}
                                                                                cartItemsAvailability = {null}
                                                                                orderStatus = "order"
                                                                    />
                            }

                        </ListItem>
                            
                        <ListItem>
                            {orderStatus === 'order placement' && <Button onClick={() => router.push('/shipping')} 
                                                                            variant="contained" 
                                                                            color="secondary">
                                                                                Edit
                                                                  </Button>}
                        </ListItem>
                    </List>
                </Card>
              
            </Grid>
            <Grid item md = {3} xs = {12}>
                <Card sx = {classes.section}>
                    <List>
                        <ListItem>
                            <Typography variant="h2">
                                Order Summary
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs = {6}>
                                    <Typography>Items:</Typography>
                                </Grid>
                                <Grid item xs = {6}>
                                    <Typography>R{itemsPrice}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs = {6}>
                                    <Typography>Tax:</Typography>
                                </Grid>
                                <Grid item xs = {6}>
                                    <Typography>R{taxPrice}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs = {6}>
                                    <Typography>Shipping Price:</Typography>
                                </Grid>
                                <Grid item xs = {6}>
                                    <Typography>R{shippingPrice}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs = {6}>
                                    <Typography>Total Price:</Typography>
                                </Grid>
                                <Grid item xs = {6}>
                                    <Typography>R{totalPrice}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        {buttons}
                       
                        
                    </List>

                </Card>
            </Grid>
        </Grid> 
  )
}

export default OrderDetails