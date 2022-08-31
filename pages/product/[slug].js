import { Button, Card, CircularProgress, Grid,  List, ListItem, Rating, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import client from '../../utils/client'
import { imageResize } from "../../utils/image"
import classes from '../../utils/classes'
import Image from "next/image"
import { useContext } from "react"
import { Store } from "../../utils/Store"
import {useSnackbar} from 'notistack'
import {useRouter} from 'next/router'
import PageLink from '../../components/PageLink'

export default function ProductScreen(props) {
    const router = useRouter()
    const {slug} = props
    const {state: {cart, addToCart}, dispatch} = useContext(Store)
    const [productData, setProductData] = useState({
        product: null,
        loading: true,
        error: ''
    })
    const {enqueueSnackbar} = useSnackbar()
    
    useEffect(() => {
        fetchproductData()
        
    }, [])
    

    const fetchproductData = async () => {
        try {
            const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, {slug})
            setProductData({...productData, product, loading: false})
        }
        
        catch (err) {
            setProductData({...productData, error: err.message, loading: false})
        }
      }
        
    return (
        
        <Layout title = {productData.product?.title}>
            {productData.product && 
                         <Box>
                            {/*where we left it*/}
                            <Box sx = {classes.section}>
                                <PageLink href = "/">                                
                                        <Typography>
                                            back to result
                                        </Typography>
                                </PageLink>
                            </Box>
                            <Grid container spacing = {1}>
                                <Grid item md = {6} xs = {12}>
                                    <Image src = {imageResize(productData.product.image, 640, 580)} 
                                           alt = {productData.product.name}
                                           layout = "responsive"
                                           height = {640}
                                           width = {640}
                                    />       
                                </Grid>
                                <Grid item md = {3} xs = {12}>
                                    <List>
                                        <ListItem>Category: {productData.product.category}</ListItem>
                                        <ListItem>Brand: {productData.product.brand}</ListItem>
                                        <ListItem>
                                            <Rating value = {productData.product.rating} readOnly/>
                                            <Typography sx = {classes.smallText}>{`(${productData.product.numReviews} reviews)`}</Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography>Description: {productData.product.description}</Typography>
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item md = {3} xs = {12}>
                                    <Card>
                                        <List>
                                            <ListItem>
                                                <Grid container>
                                                    <Grid item xs = {6}>
                                                        <Typography>
                                                            R{productData.product.price.toFixed(2)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs = {6}>
                                                        <Typography>
                                                            Status
                                                        </Typography>
                                                        <Typography sx = {productData.product.countInStock > 0 ? classes.availableColor : classes.unavailableColor}>
                                                            {productData.product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                                                        </Typography>
                                                        
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem>
                                                <Button disabled = {productData.loading || productData.product.countInStock === 0} onClick = {() => {addToCart(productData.product, cart, router, enqueueSnackbar, dispatch)}} fullWidth variant = "contained">
                                                    {productData.loading ? <CircularProgress/> : 'Add to cart'}
                                                </Button>
                                            </ListItem>
                                        </List>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                        
                        }
            {/*if title is null do not raise an error, just say title is null*/}
        </Layout>
    )
    
}

export function getServerSideProps(context) {
    return {
        props: {slug: context.params.slug}
    }
}