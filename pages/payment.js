import React, { useState, useContext,useEffect } from 'react'
import { Button, FormControl, FormControlLabel, 
         List, ListItem, Radio, RadioGroup, Typography } from '@mui/material'
import CheckoutWizard from '../components/CheckoutWizard'
import Form from '../components/Form'
import Layout from '../components/Layout'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'
import { Store } from '../utils/Store'
import color from '../utils/color'

import { useSnackbar } from 'notistack'


const Payment = () => {
  const [paymentMethodTemp, setPaymentMethodTemp] = useState('')
  const {} = useForm()
  const {state: {user, cart:{shippingAddress, paymentMethod}, savePaymentMethod},  dispatch} = useContext(Store)
  const router = useRouter()
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    if (!user) {
      redirect()
    }
    if (!shippingAddress.address) {
      router.push('/shipping')
    }
    else {
      setPaymentMethodTemp(paymentMethod)
    }
    
  }, [router, user, shippingAddress, paymentMethod])
  
  console.log(paymentMethod, shippingAddress, "state")

  const redirect = () =>  {
      return router.push('/login?redirect=/payment')
  }

  const submitHandler = (e) => {       
    e.preventDefault()
    if (!paymentMethodTemp) {
        enqueueSnackbar("Payment method is required", {variant: 'error'})
    }
    else {
        savePaymentMethod(paymentMethodTemp,  router,  dispatch)
    }
  }

  return (
    <Layout title="Payment Method">
        <CheckoutWizard activeStep={2}></CheckoutWizard>
        <Form onSubmit = {submitHandler}>
            <Typography component = "h1" variant = "h1">
                Payment Method
            </Typography>
            <List>
                    <ListItem>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label
                                        name="paymentMethod"
                                        value={paymentMethodTemp}
                                        onChange={(e) => setPaymentMethodTemp(e.target.value)}>
                                            <FormControlLabel label="Ozow"
                                                              value="Ozow"
                                                              control={<Radio />}
                                            
                                            />
                                            <FormControlLabel label="PayPal"
                                                              value="PayPal"
                                                              control={<Radio />}
                                            
                                            />
                                            <FormControlLabel label="Stripe"
                                                              value="Stripe"
                                                              control={<Radio />}
                                            
                                            />
                                            <FormControlLabel label="Cash"
                                                              value="Cash"
                                                              control={<Radio />}
                                            
                                            />

                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button variant = "contained"                               
                                type = "submit"
                                fullWidth
                                color = "primary"
                                sx = {{backgroundColor: color.primaryColor}}
                                
                                >
                            Continue
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button variant = "contained"                               
                                
                                fullWidth
                                color = "secondary"
                                sx = {{backgroundColor: color.primaryColor}}
                                onClick={() => router.push('/shipping')}
                                >
                            Back
                        </Button>
                    </ListItem>
                    
                </List>
        </Form>
    </Layout>
  )
}

export default Payment