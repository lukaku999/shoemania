export default {
    name: "order",
    title: "order",
    type: 'document',
    fields: [
        {
            name: 'user',
            title: 'user',
            type: 'reference',
            to: [{type: 'user'}],
            options: {
                disableNew: true,
            },
        },
        {
            name: 'userName',
            title: 'user Name',
            type: 'string'
        },
        {
            name: 'itemsPrice',
            title: 'items price',
            type: 'number'
            
        },
        {
            name: 'shippingPrice',
            title: 'shipping price',
            type: 'number'
            
        },
        {
            name: 'taxPrice',
            title: 'tax price',
            type: 'number'
            
        },
        {
            name: 'totalPrice',
            title: 'total price',
            type: 'number'
            
        },
        {
            name: 'shippingAddress',
            title: 'shipping address',
            type: 'shippingAddress'
            
        },
        {
            name: 'paymentResult',
            title: 'payment result',
            type: 'paymentResult'
            
        },
        {
            name: 'orderItems',
            title: 'order items ',
            type: 'array',
            of: [
                {
                    title: 'order item',
                    type: 'orderItem'
                }
            ]
            
        },
        {
            name: 'paymentMethod',
            title: 'payment method',
            type: 'string'
        },
        {
            title: 'is paid',
            name: 'isPaid',
            type: 'boolean'
        },
        {
            title: 'is delivered',
            name: 'isDelivered',
            type: 'boolean'
        },
        {
            title: 'delivered at',
            name: 'deliveredAt',
            type: 'datetime'
        },
        {
            title: 'created at',
            name: 'createdAt',
            type: 'datetime'
        },
        {
            title: 'is order complete',
            name: 'isOrderComplete',
            type: 'boolean'
        }

    ]
}