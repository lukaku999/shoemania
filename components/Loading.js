//react
import React, { useContext } from 'react'

//material ui
import {styled} from '@mui/material/styles'
import { CircularProgress } from '@mui/material'
import { Store } from '../utils/Store'


const Loading = () => {
    const {state: {loading}, dispatch} = useContext(Store)
    return (
        loading && 
            <div style={{position: 'fixed', 
                         left: '50%', 
                         top: '50%',
                         transform: 'translate(-50%, -50%)'}}>
                <CircularProgress />
            </div>
        
    )
}

export default Loading



/*const Form = styled('form')(() => ({
    position: 'fixed',
    translate: ''
}))*/

