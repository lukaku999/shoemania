import { Button, List, ListItem, Typography } from '@mui/material'
import React, { useEffect,useContext } from 'react'
import CheckoutWizard from '../components/CheckoutWizard'
import Form from '../components/Form'
import Layout from '../components/Layout'
import ModifiedTextfield from '../components/ModifiedTextfield'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'
import { Store } from '../utils/Store'
import color from '../utils/color'


const Shipping = () => {
    const {handleSubmit, control, formState: {errors,}, setValue} = useForm()
    const {state: {user, cart:{shippingAddress}, saveShippingAddress},  dispatch} = useContext(Store)
    const router = useRouter()

    useEffect(() => {
      if (!user) {
        redirect()
      }

      setValue('fullName', shippingAddress.fullName)
      setValue('address', shippingAddress.address)
      setValue('cellNumber', shippingAddress.cellNumber)
      setValue('city', shippingAddress.city)
      setValue('postalCode', shippingAddress.postalCode)
    }, [router, setValue, shippingAddress, user])
    
    const redirect = () =>  {
        return router.push('/login?redirect=/shipping')
    }

    const submitHandler = ({fullName, cellNumber, address, city, postalCode}) => {       
        saveShippingAddress({fullName, cellNumber, address, city, postalCode},  router,  dispatch)
    }

    const registrationInfo = [{
        name: "fullName",
        defaultValue: "",
        type: 'fullName',
        rules: {required: true, minLength: 1},
        label: "Full Name",
        error: errors.fullName,
        helperText: errors.fullName ? errors.fullName.type === 'minLength' ? 'Full name is not valid' : 'Full name is required'
                                    : ''
    },

    {
        name: "cellNumber",
        defaultValue: "",
        type: 'tel',
        rules: {required: true, pattern: /^([0](\d{9})|([0](\d{2})( |-)((\d{3}))( |-)(\d{4}))|[0](\d{2})( |-)(\d{7}))$/},
        label: "Cell number",
        error: errors.cellNumber,
        helperText: errors.cellNumber ? errors.cellNumber.type === 'pattern' ? 'Number is not valid' : 'Number is required'
                                    : ''
    },
    {
        name: "address",
        defaultValue: "",
        type: 'address',
        rules: {required: true, minLength: 1},
        label: "Address",
        error: errors.address,
        helperText: errors.address ? errors.address.type === 'minLength' ? 'Address is not valid' : 'Address is required'
                                    : ''
    },
    {
        name: "city",
        defaultValue: "",
        type: 'city',
        rules: {required: true, minLength: 1},
        label: "City",
        error: errors.city,
        helperText: errors.city ? errors.city.type === 'minLength' ? 'City is not valid' : 'City is required'
                                    : ''
    },
    {
        name: "postalCode",
        defaultValue: "",
        type: 'postalCode',
        rules: {required: true, minLength: 1}, 
        label: "Postal Code",
        error: errors.postalCode,
        helperText: errors.postalCode ? errors.postalCode.type === 'minLength' ? 'PostalCode is not valid' : 'PostalCode is required'
                                    : ''
    }]

  return (
    <Layout title="Shipping Address">
        <CheckoutWizard activeStep={1}></CheckoutWizard>
        <Form onSubmit = {handleSubmit(submitHandler)}>
            <Typography component = "h1" variant = "h1">
                Shipping Address
            </Typography>
            <List>
                    {
                        registrationInfo.map(fieldInfo => 
                            <ListItem>
                                <ModifiedTextfield key = {fieldInfo.name} control = {control} fieldInfo = {fieldInfo}/>
                            </ListItem>
                            
                        )
                    }
                    <ListItem>
                        <Button variant = "contained"
                                color = "primary"
                                type = "submit"
                                fullWidth
                                sx = {{backgroundColor: color.primaryColor}}
                                
                                >
                            Continue
                        </Button>
                    </ListItem>
                    
                </List>
        </Form>
    </Layout>
  )
}

export default Shipping