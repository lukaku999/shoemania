import React, { useContext, useEffect,  useState } from 'react'
import {useRouter} from 'next/router'
import { useSnackbar } from 'notistack'

import { Button, Grid, InputAdornment, List, ListItem, MenuItem, Select,  Typography } from '@mui/material'
import ProductItem from '../components/ProductItem'
import { Store } from '../utils/Store'
import Layout from '../components/Layout'
import classes from '../utils/classes'

import ModifiedTextfield from '../components/ModifiedTextfield'
import {useForm} from 'react-hook-form'
import Form from '../components/Form'
import { Box } from '@mui/system'
import ModifiedSelect from '../components/ModifiedSelect'


const Search = () => {
    const router = useRouter()
    const {state: {productData: {products, categories}, fetchProducts}, dispatch} = useContext(Store)
    const {handleSubmit, control, setValue} = useForm()

    const {enqueueSnackbar} = useSnackbar()
    const {
        category = "all",
        query = "all",
        minPrice = "1",
        price = "all",
        maxPrice = "1000000",
        rating = "all",
        sort = "default"
    } = router.query





    
    

    useEffect(() => {
        fetchProductsHandler()
        /*.then(val => {
            console.log('sdadsadasjkffkjasfhjkashfjk')
            setValue('category', category)
            setValue('rating', rating)
            
        })*/
    }, [router])

    useEffect(() => {
        setValue('category', category)
        setValue('rating', rating)
        setValue('minPrice', minPrice)
        setValue('maxPrice', maxPrice)
    }, [rating, category])
    

    const filterSearch = ({category, sort, searchQuery, price, rating}) => {
        
        const {query} = router
        if (searchQuery) query.query = searchQuery 
        if (category) query.category = category 
        if (sort) query.sort = sort
        if (price) query.price = price
        if (rating) query.rating = rating

        return query
    }

    const fetchProductsHandler = async () => {
      
        let gQuery = '*[_type == "product"'

        if (category !== 'all') {
            gQuery += ` && category match "${category}"`
        }
        if (query !== 'all') {
            gQuery += ` && name match "${query}"`
        }
        if (price !== 'all') {
            const minPrice = Number(price.split('-')[0])
            const maxPrice = Number(price.split('-')[1])
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
        //const productResult = await client.fetch(gQuery)
            

    }

    const sortHandler = (e) => {
        const query = filterSearch({sort: e.target.value})
        const path = router.pathname
        router.push({
            pathname: path,
            query: query
        })
    }

    const submitHandler = async({minPrice, maxPrice, category, rating}) => {
        let query
        query = filterSearch({searchQuery: 'all'})
        query = filterSearch({category})
        query = filterSearch({rating})
       
        if (isNaN(Number(minPrice)) || isNaN(Number(maxPrice))) {
            
            enqueueSnackbar('Incorrect value entered for minimum price', {variant: 'error'})
            
            return
            
        }
        else {
          
            const price = `${minPrice}-${maxPrice}`
            query = filterSearch({price})
            
        }

        const path = router.pathname
        router.push({
            pathname: path,
            query: query
        })
        fetchProductsHandler()
     
    }

    const priceInfo = [
        {
            name: "minPrice",
            defaultValue: "",
            rules: {},
            label: "",
            title: "Minimum Price",
            inputAdornment: {startAdornment: <InputAdornment position="start">R</InputAdornment>},
            type: "minPrice",
   
            helperText: ''
            
        },
        {
            name: "maxPrice",
            defaultValue: "",
            rules: {},
            label: "",
            title: "Maximum Price",
            inputAdornment: {startAdornment: <InputAdornment position="start">R</InputAdornment>},
            type: "maxPrice",
    
            helperText: ''
            
        },
    ]

    const selectInfo = [
        {
            name: "category",
            rules: {},
            title: "Category",
            type: "category",
            error: false,
            helperText: '',
            selectValues: ['all', ...categories]
        },
        {
            name: "rating",
            rules: {},

            title: "Rating",
            type: "rating",
            error: false,
            helperText: '',
            selectValues: ['all', 1, 2, 3, 4, 5]
            
        },
    ]
    

    return (
        <Layout title = "search">
            <Grid sx = {classes.section} container spacing = {2}>
                <Grid item md = {3}>
                <Form onSubmit = {handleSubmit(submitHandler)}>
                    
                    <List>
                        {
                            selectInfo.map(fieldInfo =>
                                    <ListItem key = {fieldInfo.name}>
                                        <Box sx = {classes.fullWidth}>
                                            <Typography>{fieldInfo.title}</Typography>
                                            <ModifiedSelect  
                                                                control = {control} 
                                                                fieldInfo = {fieldInfo}
                                            />
                                        </Box>
                                    </ListItem>
                                        

                         
                                
                            )
                        }

                        {
                            priceInfo.map(fieldInfo =>
                                    <ListItem key = {fieldInfo.name}>
                                        <Box sx = {classes.fullWidth}>
                                            <Typography>{fieldInfo.title}</Typography>
                                            <ModifiedTextfield  
                                                                control = {control} 
                                                                fieldInfo = {fieldInfo}
                                            />
                                        </Box>
                                    </ListItem>
                                        

                         
                                
                            )
                        }
                        {/*<SearchTextfield title = {'Minimum Pricing'} ref = {minPriceRef} error = {minPriceError}/>
                         <SearchTextfield title = {'Maximum Pricing'} ref = {maxPriceRef} error = {maxPriceError}/>*/
                        }
                        {/*menuData.map(data => 
                            
                            <SearchMenu key = {data.title}
                                        title = {data.title}
                                        handler = {data.handler}
                                        menuData = {data.menuData}
                                        value = {data.value}/>
                        )*/}                       
                        
                    </List>

                    <Button color = "primary" 
                            variant = "contained"
                            type = "submit"
                            sx = {classes.fullWidth}>
                            Filter
                    </Button>
                </Form>
                    
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