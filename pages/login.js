import { Button, List, ListItem, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import {useForm} from 'react-hook-form'
import Form from '../components/Form'
import Layout from '../components/Layout'
import ModifiedTextfield from '../components/ModifiedTextfield'
import PageLink from '../components/PageLink'

import color from '../utils/color'
import {useRouter} from 'next/router'
import { Store } from '../utils/Store'

const Login = () => {
    const {state: {user, loginUser}, dispatch} = useContext(Store)
    const {handleSubmit, control, formState: {errors}} = useForm()
    const {enqueueSnackbar} = useSnackbar()
    const router = useRouter()
    const {redirect} = router.query 
  
    const submitHandler = async({email, password}) => {
        loginUser({email, password}, router, enqueueSnackbar, dispatch)        
    }

    useEffect(() => {
      if (user) {
        router.push(redirect || '/')
      }
    }, [router, user, redirect])

  const loginInfo = [
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
        }
    ]
  
  return (
    <Layout title = "Login">
        <Form onSubmit = {handleSubmit(submitHandler)}>
            <Typography component = "h1" variant = "h1">
                Login 
            </Typography>
            <List>
                {
                    loginInfo.map(fieldInfo =>
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
                        Login
                    </Button>
                </ListItem>
                <ListItem>
                    Do not have an account? <PageLink href = {`/register?redirect=${redirect || '/'}`}>Register</PageLink>
                </ListItem>
            </List>

        </Form>


    </Layout>
  )
}

export default Login