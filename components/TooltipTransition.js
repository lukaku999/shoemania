import { Tooltip } from '@mui/material'
import Fade from '@mui/material/Fade';
import React from 'react'

const TooltipTransition = ({children, title}) => {
  return (
    <Tooltip TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title= {title}>

            {children}                                                                               
    </Tooltip>
  )
}

export default TooltipTransition