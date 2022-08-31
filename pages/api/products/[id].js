import nc from 'next-connect'
import client from '../../../utils/client'

const handler = nc()

export default handler.get(async(req, res) => {
    try {
        const product = await client.fetch(`*[_type == "product" && _id == $id][0]`,
                                            {id: req.query.id}) 
        res.send(product)
    }
    catch (err) {
        res.send(err)
    }
    
})