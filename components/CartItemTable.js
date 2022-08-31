import { Table, TableBody, TableCell, 
    TableContainer, TableHead, 
    TableRow, TextField, 
    Typography, Button } from '@mui/material'
import React, { useContext } from 'react'
import classes from '../utils/classes'
import PageLink from './PageLink'
import Image from 'next/image'
import { useSnackbar } from 'notistack'
import { Store } from '../utils/Store'

const CartItemTable = ({items, 
                        cartItemsAvailability, 
                        editable, 
                        orderStatus,
                        updateCart,
                        removeCart
                    }) => {

  const {enqueueSnackbar} = useSnackbar() 
  const {dispatch} = useContext(Store)  

  return (
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
                {items.map(item => <TableRow key = {item._key}>
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
                                    
                                            {orderStatus === 'order placement' ?
                                                                                editable ? <TextField                                                                                     
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
                                                                                : <Typography>{item.quantity}</Typography> 
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
  )
}

export default CartItemTable