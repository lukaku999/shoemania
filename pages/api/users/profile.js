import nc from 'next-connect'
import { isAuth, signToken } from '../../../utils/auth'
import config from '../../../utils/config'
import axios from 'axios'
//import client from '../../../../utils/client'


const handler = nc()

handler.use(isAuth)
handler.put(async (req, res) => {
    const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN
    await axios.post(`https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
        {
            mutations: [
                {
                    patch: {
                        id: req.user._id,
                        set: {
                            name: req.body.name,
                            surname: req.body.surname,
                            phone: req.body.phone
                        }
                    }
                }
            ]
        },
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${tokenWithWriteAccess}`
            }
        }
    )


    const user = {
        ...req.body,
        password: null
        
    }
    const token = signToken(user)
    res.send({...user, token})
})

export default handler