
import React, { useContext, useEffect } from 'react'
import {useRouter} from 'next/router'
import { useSnackbar } from 'notistack'
import {useForm} from 'react-hook-form'
import Layout from '../components/Layout'
import { Button, List, ListItem, Typography } from '@mui/material'
import Form from '../components/Form'
import { Store } from '../utils/Store'
import ModifiedTextfield from '../components/ModifiedTextfield'
import color from '../utils/color'
import dynamic from 'next/dynamic'


const Profile = () => {

    const {state: {user, updateUser}, dispatch} = useContext(Store)
    const router = useRouter()
    const {enqueueSnackbar} = useSnackbar()
    const {handleSubmit, control, formState: {errors}, setValue} = useForm()

    useEffect(() => {
        if (!user) {
            redirect()
        }
        else {
            setValue('name', user.name)
            setValue('surname', user.surname)
            setValue('phone', user.phone)
            setValue('email', user.email)

        }
      
    }, [router, setValue, user])
    
    console.log(user)
   
    const redirect = () =>  {
        return router.push(`/login?redirect=/profile`)
    }

    const submitHandler = async({name, surname, phone}) => {
        
        updateUser({...user, name, surname, phone}, router, enqueueSnackbar, dispatch)        
    }

    const registrationInfo = [{
        name: "email",
        defaultValue: "",
        rules: {required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
        label: "Email",
        type: "email",
        error: errors.email,
        disabled: true,
        helperText: errors.email ? errors.email.type === 'pattern' ? 'Email is not valid' : 'Email is required'
        : ''
    },
    {
        name: "name",
        defaultValue: "",
        rules: {required: true, minLength: 1},
        label: "Name",
        type: "name",
        error: errors.name,
        helperText: errors.name ? errors.name.type === 'minLength' ? 'Name is not valid' : 'Name is required'
            : ''
    },
    {
        name: "surname",
        defaultValue: "",
        rules: {required: true, minLength: 1},
        label: "Surname",
        type: "surname",
        error: errors.surname,
        helperText: errors.surname ? errors.surname.type === 'minLength' ? 'Surname is not valid' : 'Surname is required'
        : ''
    },
    {
        name: "phone",
        defaultValue: "",
        type: 'tel',
        rules: {required: true, pattern: /^([0](\d{9})|([0](\d{2})( |-)((\d{3}))( |-)(\d{4}))|[0](\d{2})( |-)(\d{7}))$/},
        label: "Phone number",
        error: errors.phone,
        helperText: errors.phone ? errors.phone.type === 'pattern' ? 'Number is not valid' : 'Number is required'
                                    : ''
    }
    ]

    return (
        <Layout title = "Profile">
            <Form onSubmit = {handleSubmit(submitHandler)}>
                <Typography component = "h1" variant = "h1">
                    Profile
                </Typography>
                <List>
                    {
                        registrationInfo.map(fieldInfo => 
                            <ListItem key = {fieldInfo.name}>
                                <ModifiedTextfield  control = {control} fieldInfo = {fieldInfo}/>
                            </ListItem>
                            
                        )
                    }
                    <ListItem>
                        <Button variant = "container"                    
                                type = "submit"
                                fullWidth
                                sx = {{backgroundColor: color.primaryColor}}                       
                                >
                            Update Profile
                        </Button>
                    </ListItem>
                    
                </List>

            </Form>


        </Layout>
    )
}

export default dynamic(() => Promise.resolve(Profile), {ssr: false}) 
