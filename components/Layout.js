//React
import React, {useEffect, useState, useContext} from 'react'

//Next
import Head from 'next/head'
import {useRouter} from 'next/router'

//MaterialUI
import {Toolbar,  CssBaseline, 
        Typography,ThemeProvider, 
        AppBar,Container, Box, 
        Switch, Badge, IconButton, 
        Divider, Drawer, useMediaQuery, 
        List, ListItem, 
        InputBase, ListItemText } from '@mui/material'

import {createTheme} from '@mui/material/styles'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import LoginIcon from '@mui/icons-material/Login'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import MenuIcon from '@mui/icons-material/Menu'

//Other Third party modules
import jsCookie from 'js-cookie'
import { useSnackbar } from 'notistack'

//Util
import classes from '../utils/classes'
import color from '../utils/color'
import { Store } from '../utils/Store'

//Component
import PageLink from './PageLink'
import TooltipTransition from './TooltipTransition'
import ProfilePopUp from './ProfilePopUp'
import Loading from './Loading'
import Footer from './Footer'


const Layout = ({title, description, children}) => {

    //state
    const [cookieData, setCookieData] = useState({cart: null, user: null})
    const [sidebarVisible, setSidebarVisible] = useState(false)
    const [query, setQuery] = useState('')

    //Context
    const {state, dispatch} = useContext(Store)
    const {darkMode,
            loading,
            cart, 
            fetchProducts, 
            user, 
            productData: {categories }} = state
    
    //Others hooks
    const router = useRouter()    
    const {enqueueSnackbar} = useSnackbar()
    const isDesktop = useMediaQuery('(min-width: 600px)')

    //theme for material ui
    const theme = createTheme({
    components: {
        MuiLink: {
            defaultProps: {
                underline: 'none'
            }
        }
    },
    typography: {
        h1: {
            fontSize: '1.6rem',
            fontWeight: 400,
            margin: '1rem 0'
        },
        h2: {
            fontSize: '1.4rem',
            fontWeight: 400,
            margin: '1rem 0'
        },
        
    },
    palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
            main: color.primaryColor
        },
        secondary: {
            main: color.secondaryColor
        },
    }
    }) 
    
    //fetching all products from sanity and getting the color mode from the cookies
    useEffect(() => {
        dispatch({type: jsCookie.get('darkMode') === 'ON' ? 'DARK_MODE_ON': 'DARK_MODE_OFF'})
        const query = '*[_type == "product"]'
        fetchProducts(query, enqueueSnackbar, dispatch)
    }, [])
    
    //setting the state for the color mode 
    useEffect(() => {
        setCookieData({...cookieData, user, cart}) 
    }, [user, cart])
  
  
    //allow users to change color mode
    const darkModeHandler = () => {
        dispatch({type: darkMode ? 'DARK_MODE_OFF': 'DARK_MODE_ON'})
        const newDarkMode = !darkMode
        jsCookie.set('darkMode', newDarkMode ? 'ON':'OFF')
    }

    //open and close category sidebar
    const sidebarCloseHandler = () => { 
        setSidebarVisible(false)
    }
    
    const sidebarOpenHandler = () => { 
        setSidebarVisible(true)
    }
    
    //set the query value entered by user
    const queryChangeHandler = (e) => {
        setQuery(e.target.value)
    }

    //reroute to search page
    const submitHandler = (e) => {
        e.preventDefault()
        router.push(`/search?query=${query}`)
    }

    return (

        <React.Fragment>
                <Head>
                    <title>{title ? `${title} - Shoemania ` : 'Shoemania'}</title>
                    {description && <meta name="description" content={description} />}
                </Head>
                {/*provding overall materialui theme for the project */}
                <ThemeProvider theme = {theme}>
                    <CssBaseline/>
                    {/*Navigation bar*/}
                    <AppBar position="fixed" sx = {classes.appbar}>
                        
                        <Toolbar sx = {classes.toolbar}>
                            {/*left buttons*/}
                            <Box display = "flex" alignItems="center">
                                {/*category button*/}
                                <IconButton edge="start"
                                            aria-label="open drawer"
                                            onClick={sidebarOpenHandler}
                                            sx={classes.menuButton}>
                                        <MenuIcon sx = {classes.navbarButton}/>
                                </IconButton>                           
                                <PageLink href="/"> 
                                    <TooltipTransition title={"Go to Homepage"}>
                                        <Typography sx = {classes.brand}>Shoemania</Typography>
                                    </TooltipTransition>                                                                                              
                                </PageLink>                                                        
                            </Box>
                            <Drawer anchor="left"
                                    open={sidebarVisible}
                                    onClose={sidebarCloseHandler}>
                                    
                                <List>
                                    <ListItem>
                                        <Box  display="flex"
                                            alignItems="center"
                                            justifyContent="space-between">
                                                <Typography>Shopping by category</Typography>
                                                <IconButton aria-label="close"
                                                            onClick={sidebarCloseHandler}>
                                                    <CancelIcon/>
                                                </IconButton>
                                        </Box>
                                    </ListItem>
                                    <Divider light />
                                    {categories && categories.map(category => 
                                        <PageLink key = {category}
                                                  href = {`/search?category=${category}`}>
                                                <ListItem IconButton 
                                                        component="a"
                                                        onClick={sidebarCloseHandler}>
                                                        <ListItemText primary = {category}>

                                                        </ListItemText>
                                                </ListItem>
                                        </PageLink>
                                    )}                                
                                </List>

                            </Drawer>
                            {/*search textfield*/}
                            <Box sx = {isDesktop ? classes.visible : classes.hidden}>
                                <form onSubmit={submitHandler}>
                                    <Box sx={classes.searchForm}>
                                        <InputBase  name="query"
                                                    sx = {classes.searchInput}
                                                    placeholder="Search products"
                                                    onChange={queryChangeHandler}
                                        />

                                        <IconButton type="submit"
                                                    sx={classes.searchButton}
                                                    aria-label="search">
                                                <SearchIcon />
                                        </IconButton>
                                    </Box>
                                </form>
                            </Box>
                            {/*right buttons*/}
                            <Box sx = {{...classes.toolbar, display: 'flex'}}>
                                {   <>
                                        {/*color mode button*/}
                                        <TooltipTransition title= {`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
                                                {<Switch checked = {darkMode} onChange = {darkModeHandler} />}                                                                                  
                                        </TooltipTransition>
                    
                                        {/*cart button*/}
                                        {cookieData.cart && 
                                            <PageLink href = "/cart">
                                                    <TooltipTransition title= {"View Cart"}>                          
                                                        <Typography component = "span">                               
                                                            <Badge  badgeContent = {cookieData.cart.cartItems.length}  
                                                                    color = "secondary" >
                                                                <ShoppingBasketIcon color="primary" />
                                                            </Badge>                                   
                                                        </Typography>  
                                                    </TooltipTransition>                                                                                     
                                            </PageLink> 
                                        }

                                        {/*loginbutton*/}                                                                                
                                        {
                                        cookieData.user 
                                            ?   <ProfilePopUp/>
                                            :   <PageLink href = "/login" >
                                                    <TooltipTransition title= {"Login"}>
                                                        <LoginIcon color="primary" sx = {{marginLeft: '1rem'}}/>
                                                    </TooltipTransition>
                                                </PageLink>

                                        }
                                
                                    </> 
                                }
                            </Box>
                            
                        </Toolbar>
                    </AppBar>
                    <Container component="main" sx = {classes.main}>
                        {children}
                    </Container>
                    <Footer/>
                    <Loading/>

                </ThemeProvider>
                
        </React.Fragment>
        
    )
}

export default Layout