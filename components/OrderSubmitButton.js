import { Button, ListItem } from '@mui/material'
import React from 'react'

const OrderSubmitButton = ({buttonList}) => {
  return (
    buttonList.map(buttonData => 
        <ListItem key = {buttonData.text}>
            <Button onClick = {buttonData.onClickHandler}
                    variant="contained"
                    color="primary"
                    fullWidth>
                    {buttonData.text}
            </Button>
        </ListItem>
    )
    
    
  )
}

export default OrderSubmitButton