import { Box, CircularProgress, formLabelClasses, ListItem, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Store } from '../../utils/Store'
import {useRouter} from 'next/router'
import OrderDetails from '../../components/OrderDetails'
import { useSnackbar } from 'notistack'
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import axios from 'axios'



const Order = ({params}) => {
  const {id: orderId} = params  

  const {state: {user, order, fetchOrder, approvePayment},  
        dispatch} = useContext(Store)
  
  const router = useRouter()
  const {enqueueSnackbar} = useSnackbar()
  const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
  const [showPayment, setShowPayment] = useState(formLabelClasses)

 
  useEffect(() => {
    if (!user) {
      redirect()
    }

    if(!order) {
      fetchOrder(user, orderId, enqueueSnackbar, dispatch)
    }
    else {
      loadPayPalScript()
    }

    if (order) {
      if (order.isPaid) {
        setShowPayment(false)
      }
      else {
        setShowPayment(true)
      }
    }

  }, [order, orderId, paypalDispatch, user, router])

  
  
  const redirect = () =>  {
      return router.push(`/login?redirect=/order/${orderId}`)
  }

  const loadPayPalScript = async () => {
      const {data: clientId} = await axios.get('/api/keys/paypal', {
        headers: {authorization: `Bearer ${user.token}`}
      })
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD'
        }
      })
      paypalDispatch({type: 'setLoadingStatus', value: 'pending'})
  }

  const createOrder = (data, actions) => {
    return actions
            .order
            .create({
              purchase_units: [
                {
                  amount: {value: order.totalPrice}
                }
              ]
            })

            .then(orderID => {
              return orderID
            })
  }

  const onApprove = (data, actions) => {
    return actions
            .order
            .capture()
            .then(async (details) => {
              
              return approvePayment(user, order._id, details, enqueueSnackbar)

            })
            .then(val => {
              fetchOrder(user, orderId, enqueueSnackbar, dispatch)
            })
  }

  const onError = (data, actions) => {
    enqueueSnackbar(getError(err), {variant: 'error'})
  }

  const cancelOrderHandler = (orderId) => {

  }



  const paymentHandler = (orderId) => {

  }

  const buttons = 
                  <ListItem>
                    {showPayment && <Box sx = {{width: '100%'}}>
                                  <PayPalButtons createOrder = {createOrder}
                                                onApprove = {onApprove}
                                                onError = {onError}
                                  >

                                  </PayPalButtons>
                              </Box> 
                    }
                      
                  </ListItem>
                  

 

  return (
        <Layout title={`Order ${orderId}`}>
            <Typography component="h1" variant="h1">
                Order {orderId}
            </Typography>
            {order && <OrderDetails order = {{...order, orderStatus: 'order'}} buttons = {buttons}/>}
            


        </Layout>
        
  )
}

export function getServerSideProps({params}) {
    return {props: {params}}
}

export default dynamic(() => Promise.resolve(Order), {ssr: false}) 