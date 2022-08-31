
import React, { useContext, useEffect } from 'react'

import { Store } from '../utils/Store'

import { useSnackbar } from 'notistack'
import CartItemTable from './CartItemTable'

const CartItems = ({editable = true}) => {
  const {state: {cart: {cartItems, cartItemsAvailability}, 
                verifyCartItemAvailability,
                updateCart,
                removeItem 
                },
   
        dispatch} = useContext(Store)

  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    verifyCartItemAvailability(cartItems, enqueueSnackbar, dispatch)
  }, [])

  useEffect(() => {
    verifyCartItemAvailability(cartItems, enqueueSnackbar, dispatch)
  }, [cartItems])

  
  
  console.log(cartItemsAvailability, "cartItemsAvailability", cartItems, "cartItems")
  
  return (
    cartItemsAvailability.length === cartItems.length &&
    <CartItemTable items = {cartItems} 
                    cartItemsAvailability = {cartItemsAvailability}
                    editable = {editable}
                    orderStatus = "order placement"
                    updateCart = {updateCart}
                    removeItem = {removeItem}
    />
  )
}

export default CartItems