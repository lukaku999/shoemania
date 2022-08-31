import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import axios from 'axios'
import config from '../../../utils/config'
import {signToken} from '../../../utils/auth'
import client from '../../../utils/client'

const handler = nc()

export default handler.post(async(req, res) => {
    try {
        const getUser = await client.fetch(`*[_type == "user" && email == $email]`, {email: req.body.email})
        if (getUser.length > 0) {
     
            res.status(401).send({message: 'User already exist'})
        }
        else {
          
            const projectId = config.projectId
            const dataset = config.dataset
            const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN
            const createMutations = [
                {
                    create: {
                        _type: 'user',
                        name: req.body.name,
                        surname: req.body.surname,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password),
                        isAdmin: false
                    }
                }
            ]
  
            const {data} = await axios
                                .post(`https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
                                        {mutations: createMutations},
                                        {headers: {'Content-type': 'application/json',
                                                    Authorization: `Bearer ${tokenWithWriteAccess}`,
                                                }
                                        }
                                )


    
            const user = {
                _id: data.results[0].id,
                ...req.body,
                password: null
                
            }
            const token = signToken(user)
            res.send({...user, token})
        }
        
    }

    catch (err) {
        res.status(500).send(err)
    } 
    
})

