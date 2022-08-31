export default {
    title: 'payment method',
    name: 'paymentMethod',
    type: 'object',
    fields: [

        {
            title: 'name',
            name: 'name',
            type: 'string',
            options: {
                list: [
                    { title: 'cash', value: 'cash' },
                    { title: 'instant eft', value: 'eft' },
                    { title: 'e-wallet', value: 'e-wallet' },
                    { title: 'credit card', value: 'credit' },
                    { title: 'bank transfers', value: 'bankTransfers' },
                    { title: 'lay-by', value: 'layby' },
                ],
            },
        }
        
    ]
}