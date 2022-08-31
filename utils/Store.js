import Cookies from 'js-cookie'
import {createContext, useReducer} from 'react'
import { imageResize } from './image'

import axios from 'axios'
import getError from '../utils/error'
import client from './client'


export const Store = createContext()
const initialState = {
    darkMode: false,
    loading: false,
    productData: {products: [], categories: [], productFetched: false},
    user: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null, 
    cart: {
        cartItems: Cookies.get('cartItems') ?
                   JSON.parse(Cookies.get('cartItems')) : [],
        cartItemsAvailability: [],
        shippingAddress: Cookies.get('shippingAddress') ?
                   JSON.parse(Cookies.get('shippingAddress')) : [],
        
        paymentMethod: Cookies.get('paymentMethod') ? Cookies.get('paymentMethod').replace(/['"]+/g, '') : ''
    },
    order: null,
    orders: [],
    addToCart: async (product, cart, router, enqueueSnackbar, dispatch) => {
    
        try {
            const existItem = cart.cartItems.find(x => x._key === product._id)
            const quantity = existItem ? parseInt(existItem.quantity) + 1 : 1
            const {data} = await axios.get(`/api/products/${product._id}`)
            
            if (data.countInStock === 0) {
                
                enqueueSnackbar('Sorry. Product is out of stock', {variant: 'error'})
                return
            }
            else if (data.countInStock < quantity) {
                enqueueSnackbar(`Item quanity you requested exceeds stock count. 
                                 You requested ${quantity}, only ${data.countInStock} are available `, {variant: 'error'})
                return
            }
            dispatch({type: 'CART_ADD_ITEM', payload: {
                _key: product._id,
                name: product.name,
                countInStock: product.countInStock,
                slug: product.slug.current,
                price: product.price,
                image: imageResize(product.image, 300, 300),
                quantity
            }})
            
            enqueueSnackbar(`${product.name} added to cart`, {variant: 'success'})
            router.push('/cart')
    
        }
    
        catch (err){
            enqueueSnackbar(getError(err), {variant: 'error'}) 
        }       
        
    },
    updateCart: async (item, quantity, enqueueSnackbar, dispatch) => {
        try {
            const {data} = await axios.get(`/api/products/${item._key}`)
            
            dispatch({type: 'CART_ADD_ITEM', payload: {
                _key: item._key,
                name: item.name,
                countInStock: item.countInStock,
                slug: item.slug,
                price: item.price,
                image: item.image,
                quantity
            }})
            
            //enqueueSnackbar(`${item.name} updated to cart`, {variant: 'success'})
        }
        catch {
            enqueueSnackbar('Something went wrong', {variant: 'error'})
        }
    },
    removeItem: async (item, dispatch) => {
        dispatch({type: 'CART_REMOVE_ITEM', payload: item})
    },
    registerUser: async (userDetails, router, enqueueSnackbar, dispatch) => {
        try {
            
            const {data} = await axios.post('/api/users/register', userDetails)
            console.log(data, "data")
            dispatch({type: 'USER_LOGIN', payload: data})
            Cookies.set('userInfo', JSON.stringify(data))
            enqueueSnackbar("Thank you for registering with us", {variant: 'success'})
            const {redirect} = router.query           
            router.push(redirect || '/')
        }
        catch (err) {
            enqueueSnackbar(getError(err), {variant: 'error'})          
        }
    },
    loginUser: async (userDetails, router, enqueueSnackbar, dispatch) => {
        try {
            console.log("begin")
            const {data} = await axios.post('/api/users/login', userDetails)
            console.log(data, "end")
            dispatch({type: 'USER_LOGIN', payload: data})
            Cookies.set('userInfo', JSON.stringify(data)) 
            const {redirect} = router.query           
            router.push(redirect || '/')
        }
        catch (err) {
                enqueueSnackbar(getError(err), {variant: 'error'}) 
        }
    },
    logoutUser: async (router, enqueueSnackbar, dispatch) => {
        
        dispatch({type: 'USER_LOGOUT'})
        Cookies.remove('userInfo')
        Cookies.remove('cartItems')
        Cookies.remove('shippingAddress')
        Cookies.remove('paymentMethod')
        enqueueSnackbar("You have logged out", {variant: 'warning'})
        router.push('/')
    },
    updateUser: async (userDetails, router, enqueueSnackbar, dispatch) => {
        try {
            const {data} = await axios.put(
                '/api/users/profile',
                userDetails,
                {headers: {authorization: `Bearer ${userDetails.token}`}}
            )
            dispatch({type: 'USER_LOGIN', payload: data})
            Cookies.set('userInfo', JSON.stringify(data)) 
            enqueueSnackbar('Profile has been updated successfully', {variant: 'success'}) 
        }

        catch (err) {
            
            enqueueSnackbar(getError(err), {variant: 'error'}) 
        }
    },
    saveShippingAddress: async(shippingDetails, router,  dispatch) => {
        
        dispatch({type: 'SAVE_SHIPPING_ADDRESS', payload: shippingDetails})
        Cookies.set('shippingAddress', JSON.stringify(shippingDetails))
        router.push('/payment')
    },
    savePaymentMethod: async(paymentMethod, router,  dispatch) => {
        console.log("inside store")
        dispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod})
        Cookies.set('paymentMethod', JSON.stringify(paymentMethod))
        router.push('/place-order')
    },
    verifyCartItemAvailability: async(items, enqueueSnackbar, dispatch) => {
        const cartItemsIDs = items.map(item => item._key)
        try {
            
            const products = await client.fetch(`*[_type == "product" && _id in $ids]`, {ids: cartItemsIDs})
            
            const cartItemAvailability = products.map(product => ({_key: product._id, 
                                                                cartQuantity: items.find(cartItem => cartItem._key === product._id).quantity,
                                                                productQuantity: product.countInStock,
                                                                userQuantityInput: items.find(cartItem => cartItem._key === product._id).quantity,
                                                                insufficientProduct: product.countInStock < items.find(cartItem => cartItem._key === product._id).quantity
                                    }))
            dispatch({type: 'UPDATE_CART_PRODUCT_AVAILABILITY', payload: cartItemAvailability})
            //setAvailableQuantity(productAvailability)
        }
        catch (err) {
            enqueueSnackbar(getError(err), {variant: 'error'})  
        }
    },
    placeOrder: async(orderData, router, enqueueSnackbar, dispatch) => {
        
        try {
            console.log(orderData, "start")
            const {data} = await axios.post('api/orders', 
                {
                    orderItems: orderData.cart.cartItems.map(x => ({
                        ...x,
                        countInStock: undefined,
                        slug: undefined
                    })),
                    shippingAddress: orderData.cart.shippingAddress,
                    paymentMethod: orderData.cart.paymentMethod,
                    itemsPrice: orderData.cart.prices.itemsPrice,
                    shippingPrice: orderData.cart.prices.shippingPrice,
                    taxPrice: orderData.cart.prices.taxPrice,
                    totalPrice: orderData.cart.prices.totalPrice
                },  
                {
                    headers: {
                        authorization: `Bearer ${orderData.user.token}`
                    }
                }
            )
            
            router.push(`/order/${data}`)
            dispatch({type: 'CLEAR_CART'}) 
            Cookies.remove('cartItems') 
            enqueueSnackbar("Your order has been placed", {variant: 'success'}) 
            
        }
        catch (err) {
            enqueueSnackbar(getError(err), {variant: 'error'})  
        }
    },
    fetchOrder: async (user, orderId, enqueueSnackbar, dispatch) => {
        try {
            console.log(user, orderId, "yeah")
            const {data} = await axios.get(`/api/orders/${orderId}`, 
                {
                    headers: {authorization: `Bearer ${user.token}`}
                })
            
            dispatch({type: 'FETCH_ORDER', payload: data})
        }

        catch (err) {
            enqueueSnackbar(getError(err), {variant: 'error'})
        }
    },
    fetchOrders: async (user, enqueueSnackbar, dispatch) => {
        try {
           
            const {data} = await axios.get(`/api/orders/history`, 
                {
                    headers: {authorization: `Bearer ${user.token}`}
                })
            
            dispatch({type: 'FETCH_ORDERS', payload: data})
        }

        catch (err) {
            enqueueSnackbar(getError(err), {variant: 'error'})
        }
    },
    approvePayment: async (user, orderId, details, enqueueSnackbar) => {
        switch (paymentMethod) {
            case 'PayPal':
                try {
                    const {data} = await axios.put(`/api/orders/${orderId}/pay`, 
                                  details,
                                  {
                                    headers: {authorization: `Bearer ${user.token}`}
                                  })
                    enqueueSnackbar('Payment is successful', {variant: 'success'})
                }
        
                catch (err) {
                    enqueueSnackbar(getError(err), {variant: 'error'})
                }
                
                break;
          
            default:
              break;
        }
        
    },
    fetchCategories: async (user, orderId, details, enqueueSnackbar) => {
        try {
            const {data} = await axios.get('/api/products/categories')
            setCategories(data)
        }

        catch (err) {
            enqueueSnackbar(getError(err), {variant: 'error'})
        }
    },
    fetchProducts: async (query, enqueueSnackbar, dispatch) => {
        dispatch({type: 'LOADING_ON'})
        try {
            const products = await client.fetch(query)
            const categories = [...new Set(products.map(product => product.category))]
            const changeCategory = query === '*[_type == "product"]' 
            dispatch({type: 'FETCH_PRODUCTS', payload: {products, categories, changeCategory}})
            dispatch({type: 'LOADING_OFF'})
        }
        catch (err) {
            dispatch({type: 'LOADING_OFF'})
            enqueueSnackbar(getError(err), {variant: 'error'})
            
        }
    }

}
const reducer = (state, action) => {
    let cartItems, newItem
    switch (action.type) {
        case 'DARK_MODE_ON':
            return {...state, darkMode: true}

        case 'DARK_MODE_OFF':
            return {...state, darkMode: false}

        case 'LOADING_ON':
            return {...state, loading: true}
        
        case 'LOADING_OFF':
            return {...state, loading: false}

        case 'FETCH_PRODUCTS':
            if (action.payload.changeCategory) {
                return {...state, productData: action.payload}
            }
            else {
                return {...state, productData: {...state.productData, products: action.payload.products} }
            }

        case 'CART_ADD_ITEM':
            newItem = action.payload         
            const existItem = state.cart.cartItems.find(item => item._key === newItem._key)          
            cartItems = existItem ? state.cart.cartItems.map(item => item._key === existItem._key ? newItem: item)   
                                        : [...state.cart.cartItems, newItem] 
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return {...state, cart: {...state.cart, cartItems}}

        case 'CART_REMOVE_ITEM':
            newItem = action.payload
            cartItems = state.cart.cartItems.filter(item => item._key !== newItem._key)
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return {...state, cart: {...state.cart, cartItems}}
        
        case 'USER_LOGIN':
            return {...state, user: action.payload}

        case 'USER_LOGOUT':
            return {...state, user: null, order: null, cartItems: {}}
        
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload
                }
            }
        
        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload
                }
            }

        case 'UPDATE_CART_PRODUCT_AVAILABILITY':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItemsAvailability: action.payload
                }
            }
        
        case 'CLEAR_CART':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: [],
                    cartItemsAvailability: []
                }
            }

        case 'FETCH_ORDER':
            return {...state, order: action.payload}
        
        case 'FETCH_ORDERS':
            return {...state, orders: action.payload}

        default:
            return state
    }
}

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = {state, dispatch}
    return <Store.Provider value = {value}>{children}</Store.Provider>
}