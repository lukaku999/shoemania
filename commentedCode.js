/*axios.get(`/api/products/${productData.product._id}`)
        .then(refreshedproductData => {
            console.log(refreshedproductData, "count in stock")
            if (refreshedproductData.countInStock < quantity) {
                enqueueSnackbar('Sorry. Product is out of stock', {variant: 'error'})
                return
            }
            dispatch({type: 'CART_ADD_ITEM', payload: {
                _key: productData.product._id,
                name: productData.product.name,
                countInStock: productData.product.countInStock,
                slug: productData.product.slug.current,
                price: productData.product.price,
                image: imageResize(productData.product.image, 300, 300),
                quantity
            }})
            enqueueSnackbar(`${productData.product.name} added to cart`, {variant: 'success'})
            setProductData({...productData, loading: false})
            return 
        })
        .then(() => {
            console.log(JSON.parse(Cookies.get('cartItems')), "cart items")
        })
        .catch (err => {
            enqueueSnackbar(err.message, {variant: 'error'})
            setProductData({...productData, loading: false})
        })*/



        /*const addToCart = async () => {

        try {
            const existItem = cart.cartItems.find(x => x._key === productData.product._id)
            const quantity = existItem ? existItem.quantity + 1 : 1
         
            setProductData({...productData, loading: true})
            const {data} = await axios.get(`/api/products/${productData.product._id}`)
            console.log(data, "data")
            if (data.countInStock === 0) {
                
                enqueueSnackbar('Sorry. Product is out of stock', {variant: 'error'})
                setProductData({...productData, loading: false})
                return
            }
            else if (data.countInStock < quantity) {
                enqueueSnackbar(`Item quanity you requested exceeds stock count. 
                                 You requested ${quantity}, only ${data.countInStock} are available `, {variant: 'error'})
                setProductData({...productData, loading: false})
                return
            }
            dispatch({type: 'CART_ADD_ITEM', payload: {
                _key: productData.product._id,
                name: productData.product.name,
                countInStock: productData.product.countInStock,
                slug: productData.product.slug.current,
                price: productData.product.price,
                image: imageResize(productData.product.image, 300, 300),
                quantity
            }})
            enqueueSnackbar(`${productData.product.name} added to cart`, {variant: 'success'})
            setProductData({...productData, loading: false})
            router.push('/cart')
    
        }

        catch {
            enqueueSnackbar('Something went wrong', {variant: 'error'})
        }
        
        
        
    }*/


    {/*<ListItem>
                    <Controller name="name"
                                control = {control}
                                defaultValue = ""
                                rules = {{required: true, minLength: 1}}
                                render = {({field}) => (
                                    <TextField variant = "outlined"
                                               fullWidth
                                               id = "name"
                                               label="name"
                                               
                                               inputProps={{type: "name"}}
                                               error={Boolean(errors.name)}
                                               helperText = {errors.name ? errors.name.type === 'pattern' ? 'Name is not valid' : 'Name is required'
                                                                          : ''}
                                               {...field}/>             
                                )}>
                    </Controller>
                </ListItem>
                <ListItem>
                    <Controller name="email"
                                control = {control}
                                defaultValue = ""
                                rules = {{required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$/,}}
                                render = {({field}) => (
                                    <TextField variant = "outlined"
                                               fullWidth
                                               id = "email"
                                               label="Email"
                                               
                                               inputProps={{type: "email"}}
                                               error={Boolean(errors.email)}
                                               helperText = {errors.email ? errors.email.type === 'pattern' ? 'Email is not valid' : 'Email is required'
                                                                          : ''}
                                               {...field}/>             
                                )}>
                    </Controller>
                </ListItem>
                <ListItem>
                    <Controller name="password"
                                control = {control}
                                defaultValue = ""
                                rules = {{required: true, minLength: 6}}
                                render = {({field}) => (
                                    <TextField variant = "outlined"
                                               fullWidth
                                               id = "password"
                                               label="Password"
                                               
                                               inputProps={{type: "password"}}
                                               error={Boolean(errors.password)}
                                               helperText = {errors.password ? errors.password.type === 'minLength' ? 'Password should be 6 characters or more' : 'Password is required'
                                                                          : ''}
                                               {...field}/>
                                                            
                                   
                                               
                                )}>
                    </Controller>
                </ListItem>
                <ListItem>
                    <Controller name="confirmPassword"
                                control = {control}
                                defaultValue = ""
                                rules = {{required: true, minLength: 6}}
                                render = {({field}) => (
                                    <TextField variant = "outlined"
                                               fullWidth
                                               
                                               id = "confirmPassword"
                                               label="Confirm Password"
                                               inputProps={{type: "password"}}
                                               error={Boolean(errors.confirmPassword)}
                                               helperText = {errors.Password ? errors.Password.type === 'minLength' ? 'Confirm password should be 6 characters or more' : 'Confirm password is required'
                                                                          : ''}
                                               {...field}/>
                                                            
                                   
                                               
                                )}>
                    </Controller>
                </ListItem>*/}


                {
                     /*const updatedAvailableQuantity = availableQuantity.map(product => product._key === item._key ? {...product, userQuantityInput: quantity} : product)
        setAvailableQuantity(updatedAvailableQuantity)*/
                }

                {
                    /*if (data.countInStock === 0) {
            
                //enqueueSnackbar('Sorry. Product is out of stock', {variant: 'error'})
                //setProductData({...productData, loading: false})
                return
            }
            else if (data.countInStock < quantity) {
                //enqueueSnackbar('Item quanity you requested exceeds stock count.', {variant: 'error'})
                //setProductData({...productData, loading: false})
                return
            }
            */
                }


                {
                    /*{
               
                error ? ({params}) ? <Alert variant="error">{error}</Alert>
                                    : (<Grid container spacing = {1}>
                                            <Grid item md = {9} xs = {12}>
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
                                                    Status: {' '}
                                                    {isDelivered ? `delivered at ${deliveredAt}`: 'not delivered'}
                                                </ListItem>
                                            </List>
                                            </Grid>
                                        </Grid>)*/

                                        
                }

                
        {/*<Grid container spacing = {1}>
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
                                <Button onClick={() => router.push('/shipping')} 
                                        variant="contained" 
                                        color="secondary">Edit</Button>
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
                            <Button onClick={() => router.push('/payment')} 
                                    variant="contained" 
                                    color="secondary">Edit</Button>
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
                            <CartItems editable = {false}/>

                        </ListItem>
                            
                        <ListItem>
                            <Button onClick={() => router.push('/shipping')} 
                                    variant="contained" 
                                    color="secondary">Edit</Button>
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
                        <ListItem>
                            <Button onClick={placeOrderHandler}
                                    variant="contained"
                                    color="primary"
                                    fullWidth>
                                Place Order
                            </Button>
                        </ListItem>
                        
                    </List>

                </Card>
            </Grid>
            </Grid>*/}


            {
                /*
                <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align = "center">Image</TableCell>
                    <TableCell align = "center">Name</TableCell>
                    <TableCell align = "center">Quantity</TableCell>
                    <TableCell align = "center">Price {'(per item)'}</TableCell>
                    {editable && <TableCell align = "center">Action</TableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {cartItems.map(item => <TableRow key = {item._key}>
                                            <TableCell align = "center">
                                                <PageLink href={`/product/${item.slug}`}>
                                                        <Image src = {item.image}
                                                            alt = {item.name}
                                                            width = {50}
                                                            height = {50}
                                                        />
                                                </PageLink>
                                            </TableCell>
                                            <TableCell align = "center">
                                                <PageLink href={`/product/${item.slug}`}>                                                                  
                                                        <Typography>{item.name}</Typography>
                                                </PageLink>
                                            </TableCell>
                                            <TableCell  align = "center">
                                      
                                            {editable ? <TextField                                                                                     
                                                            value={item.quantity}
                                                            size = "medium"
                                                            sx = {classes.quantityTextField}
                                                            onChange = {e => updateCart(item, parseInt(e.target.value), enqueueSnackbar, dispatch)}
                                                            type="number"
                                                            color="primary"
                                                            error = {cartItemsAvailability.length > 0  && cartItemsAvailability.find(product => product._key === item._key).insufficientProduct}
                                                            helperText = {cartItemsAvailability.length > 0  && `${cartItemsAvailability.find(product => product._key === item._key).productQuantity} left` 
                                                                            }
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            >
                                                            {item.quantity}
                                                        </TextField>
                                                       : <Typography sx = {cartItemsAvailability.length > 0  && 
                                                                              cartItemsAvailability.find(product => product._key === item._key).insufficientProduct ? classes.unavailableColor : classes.availableColor}>{item.quantity}</Typography> 
                                            }                                                                                            
                                            </TableCell >
                                            <TableCell  align = "center">R{item.price.toFixed(2)}</TableCell>
                                            {editable &&    <TableCell  align = "center">
                                                                <Button variant = "contained"
                                                                        color = "secondary"
                                                                        onClick = {() => removeItem(item, dispatch)}>
                                                                            X
                                                                </Button>
                                                            </TableCell>
                                            }
                                        </TableRow>)}
            </TableBody>    
        </Table>
    </TableContainer>
                */
            }


            /*
            
            const fetchData = async () => {
                try {
                const products = await client.fetch(`*[_type == "product"]`)
                setProductData({...productData, products, loading: false})
                }
                catch (err) {
                setProductData({...productData, error: err.message, loading: false})
                }
            }

            
            useEffect(() => {
                fetchData()
                
            }, [])
            */


            {
                /*<Box sx = {classes.fullWidth}>
                    <Typography>{title}</Typography>
                    <Select fullWidth 
                            value = {value}
                            onChange = {handler}>
                                <MenuItem value = "all">All</MenuItem>
                                {menuData && menuData.map(val => 
                                    <MenuItem key = {val} value = {val}>
                                        {val}
                                    </MenuItem>
                                )}
                    </Select>
                </Box>
                */
            }


            {
                /*
                import React, { useContext, useEffect, useRef, useState } from 'react'
import {useRouter} from 'next/router'
import { useSnackbar } from 'notistack'
import SearchMenu from '../components/SearchMenu'
import { Button, Grid, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material'
import ProductItem from '../components/ProductItem'
import { Store } from '../utils/Store'
import Layout from '../components/Layout'
import classes from '../utils/classes'
import SearchTextfield from '../components/SearchTextfield'



const Search = () => {
    const router = useRouter()
    const {state: {productData: {products, categories}, fetchProducts}, dispatch} = useContext(Store)
    const {enqueueSnackbar} = useSnackbar()
    const {
        category = "all",
        query = "all",
        minPrice = "",
        price = "all",
        maxPrice = "",
        rating = "all",
        sort = "default"
    } = router.query

    const [minPriceError, setMinPriceError] = useState(false)
    const [maxPriceError, setMaxPriceError] = useState(false)
    const minPriceRef = useRef('')
    const maxPriceRef = useRef('')


    

    useEffect(() => {
        fetchProductsHandler()
    }, [category, price, minPrice, maxPrice,query, rating, sort])

    const filterSearch = ({category, sort, searchQuery, price, rating}) => {
        const path = router.pathname
        const {query} = router
        if (searchQuery) query.searchQuery = searchQuery 
        if (category) query.category = category 
        if (sort) query.sort = sort
        if (price) query.price = price
        if (rating) query.rating = rating

        router.push({
            pathname: path,
            query: query
        })
    }

    const fetchProductsHandler = () => {
      
        let gQuery = '*[_type == "product"'

        if (category !== 'all') {
            gQuery += ` && category match "${category}"`
        }
        if (query !== 'all') {
            gQuery += ` && name match "${query}"`
        }
        if (price !== 'all') {
            const minPrice = Number(price.split('-')[0])
            const maxrice = Number(price.split('-')[1])
            gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`
        }
        if (rating !== 'all') {
            gQuery += ` && rating >= ${Number(rating)}`
        }

        let order = ''
        if (sort !== 'default') {
            if (sort === 'lowest') order = '| order(price asc)'
            if (sort === 'highest') order = '| order(price desc)'
            if (sort === 'toprated') order = '| order(rating desc)'
        }

        gQuery += `] ${order}`
        
        fetchProducts(gQuery, enqueueSnackbar, dispatch)
        const productResult = await client.fetch(gQuery)
            

    }

    const categoryHandler = (e) => {
        filterSearch({category: e.target.value})
    }
    const sortHandler = (e) => {
        filterSearch({sort: e.target.value})
    }
    const priceHandler = (e) => {

        price = `${minPriceRef.current}-${maxPriceRef.current}`
        minPriceRef.current
        maxPriceRef.current
        //filterSearch({price: e.target.value})
    }
    const ratingHandler = (e) => {
        //filterSearch({rating: e.target.value})
    }
    
    const menuData = [
        {title: "Category", handler: categoryHandler, value: category, menuData: categories}, 
        {title: "Ratings", handler: ratingHandler, value: rating, menuData: [1, 2, 3, 4, 5]},  
    ]

    return (
        <Layout title = "search">
            <Grid sx = {classes.section} container spacing = {2}>
                <Grid item md = {3}>
                    
                    <List>
                        {menuData.map(data => 
                            <SearchMenu key = {data.title}
                                        title = {data.title}
                                        handler = {data.handler}
                                        menuData = {data.menuData}
                                        value = {data.value}/>
                        )}                       
                        
                    </List>
                    <List>
                        <SearchTextfield title = {'Minimum Pricing'} ref = {minPriceRef} error = {minPriceError}/>
                        <SearchTextfield title = {'Maximum Pricing'} ref = {maxPriceRef} error = {maxPriceError}/>
                    </List>
                    <Button color = "primary" 
                            variant = "contained" 
                            sx = {classes.fullWidth}>
                            Filter
                    </Button>
                </Grid>
                <Grid item md = {9}>
                    <Grid container justifyContent = "space-between" alignItems = "center">
                        
                            {' '}
                            {products && products.length !== 0 ? products.length : 'No'}{' '}
                            Results
                            {(query !== 'all' && query !== '') || rating !== 'all' || price !== 'all'
                                ?   <Button onClick = {() => router.push('/search')}>
                                        X
                                    </Button>
                                
                                :   null
                            }
                            <Grid item>
                                <Typography component = "span" sx = {classes.sort}>
                                    Sort by
                                </Typography>
                                <Select value = {sort} onChange = {sortHandler}>
                                    <MenuItem value = "default">Default</MenuItem>
                                    <MenuItem value = "lowest">Price: Low to High</MenuItem>
                                    <MenuItem value = "highest">Price: High to Low</MenuItem>
                                    <MenuItem value = "toprated">Customer Reviews</MenuItem>
                                </Select>
                            </Grid>
                    </Grid>   
                    <Grid sx = {classes.section} container spacing = {3}>
                        {products.map(product => (
                            <Grid item xs = {6} md = {4} key = {product.name}>
                                
                                <ProductItem  product = {product} />
                                
                            </Grid> 
                        ))}
                    </Grid>

                    

                </Grid>
            </Grid>
        </Layout>
    )
}

export default Search
                 */
            }