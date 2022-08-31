import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import {signToken} from '../../../utils/auth'
import client from '../../../utils/client'

const handler = nc()

export default handler.post(async(req, res) => {
    try {
        const user = await client.fetch(`*[_type == "user" && email == $email]`, {email: req.body.email})
    
        if (user.length > 0) {
            if (bcrypt.compareSync(req.body.password, user[0].password)) {
                const userData = {
                    ...user[0], password: null
                }
                
                const token = signToken(userData)
                const data = {...userData, token}
                console.log(data)
                res.send(data)
            }
            else {
                console.log("failed")
                res.status(401).send({message: 'Invalid email or password'})
            }
            
        }
        
        else {
            console.log("failed")
            res.status(401).send({message: 'Invalid email or password'})
        }
    }

    catch (err) {
        
        res.status(500).send(err)
    } 
    
})

