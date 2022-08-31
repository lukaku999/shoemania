import React, { useContext, useEffect } from 'react'
import { Store } from '../utils/Store'
import {useRouter} from 'next/router'
import { useSnackbar } from 'notistack'
import Layout from '../components/Layout'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import PageLink from '../components/PageLink'
import dynamic from 'next/dynamic'

const OrderHistory = () => {
    const {state: {user, orders, fetchOrders},  dispatch} = useContext(Store)

    const router = useRouter()
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        if (!user) {
            redirect()
        }
        else {
            fetchOrders(user,  enqueueSnackbar, dispatch)
        }
        
    }, [user]) 

    const redirect = () =>  {
        return router.push(`/login?redirect=/order-history`)
    }

    return (
        <Layout title = "Order History">
            <Typography component = "h1" variant = "h1">
                Order History
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell  align = "center">ID</TableCell>
                            <TableCell align = "center">Date Ordered</TableCell>
                            <TableCell align = "center">Total</TableCell>
                            <TableCell align = "center">Paid</TableCell>
                            <TableCell align = "center">Delivered</TableCell>
                            <TableCell align = "center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => 
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell align = "center">{order.createdAt}</TableCell>
                                <TableCell align = "center">R{order.totalPrice}</TableCell>
                                <TableCell align = "center">{order.isPaid ? `paid at ${order.paidAt}` : 'not paid'}</TableCell>
                                <TableCell align = "center">{order.isDelivered ? `delivered at ${order.delivered}` : 'not delivered'}</TableCell>
                                <TableCell align = "center">
                                    <PageLink href = {`/order/${order._id}`}>
                                        <Button variant="contained">Details</Button>        
                                    </PageLink>
                                </TableCell>
                            </TableRow> 
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(OrderHistory), {ssr: false}) 