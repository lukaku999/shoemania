import { Button, List, ListItem, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, {useContext, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import Form from '../components/Form'
import Layout from '../components/Layout'
import ModifiedTextfield from '../components/ModifiedTextfield'
import PageLink from '../components/PageLink'
import color from '../utils/color'
import {useRouter} from 'next/router'
import { Store } from '../utils/Store'


const register = () => {
    const {state: {user, registerUser}, dispatch} = useContext(Store)
    const {handleSubmit, control, formState: {errors}} = useForm()
    const {enqueueSnackbar} = useSnackbar()
    const router = useRouter()
    const {redirect} = router.query 
  
    const submitHandler = async({name, surname, email, password, confirmPassword}) => {
        if (password !== confirmPassword) {
            enqueueSnackbar("Passwords don't match", {variant: 'error'})
            return
        }
        registerUser({name, surname, email, password}, router, enqueueSnackbar, dispatch)        
    }

    useEffect(() => {
      if (user) {
        router.push(redirect || '/')
      }
    }, [router, user, redirect])
    
    
    const registrationInfo = [{
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
                                    name: "email",
                                    defaultValue: "",
                                    rules: {required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
                                    label: "Email",
                                    type: "email",
                                    error: errors.email,
                                    helperText: errors.email ? errors.email.type === 'pattern' ? 'Email is not valid' : 'Email is required'
                                    : ''
                                },
                                {
                                    name: "password",
                                    defaultValue: "",
                                    rules: {required: true, minLength: 6},
                                    label: "Password",
                                    type: "password",
                                    error: errors.password,
                                    helperText: errors.password ? errors.password.type === 'minLength' ? 'Password should be 6 characters or more' : 'Password is required'
                                    : ''
                                },
                                {
                                    name: "confirmPassword",
                                    defaultValue: "",
                                    rules: {required: true, minLength: 6},
                                    label: "Confirm Password",
                                    type: "password",
                                    error: errors.confirmPassword,
                                    helperText: errors.password ? errors.password.type === 'minLength' ? 'Password should be 6 characters or more' : 'Password is required'
                                    : ''
                                },
    ]
    
    return (
        <Layout title = "Register">
            <Form onSubmit = {handleSubmit(submitHandler)}>
                <Typography component = "h1" variant = "h1">
                    Register
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
                        <Button variant = "container"
                                
                                type = "submit"
                                fullWidth
                                sx = {{backgroundColor: color.primaryColor}}
                                
                                >
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already have an account? <PageLink href = {`/login?redirect=${redirect || '/'}`}>Login</PageLink>
                    </ListItem>
                </List>

            </Form>


        </Layout>
    )
}

export default register