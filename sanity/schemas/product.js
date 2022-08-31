export default {
    name: "product",
    title: "product",
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'name',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'image',
            title: 'image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'description',
            title: 'description',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96
            }
        },
        {
            name: 'category',            
            title: 'category',
            type: 'string',
            options: {
                list: [
                    { title: 'boots', value: 'boots' },
                    { title: 'slippers', value: 'slippers' },
                    { title: 'sneakers', value: 'sneakers' },
                    
                ],
            },
            
        },
        {
            name: 'numReviews',
            title: 'number of reviews',
            type: 'number'
        },

        {
            name: 'rating',
            title: 'rating',
            type: 'number'
        },
        {
            name: 'countInStock',
            title: 'count in stock',
            type: 'number'
        },


  


    ]
}