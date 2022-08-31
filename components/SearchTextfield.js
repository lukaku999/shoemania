import { InputAdornment, ListItem, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import classes from '../utils/classes'

const SearchTextfield = ({title, ref, error}) => {

  return (
    <ListItem>
        <Box sx = {classes.fullWidth}>
            <Typography>{title}</Typography>
            <TextField variant = "outlined"
                    fullWidth
                    helperText = 'Enter Amount'
                    inputRef={ref}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R</InputAdornment>,
                    }}
                    
            /> 
        </Box>
        
    </ListItem>
     
  )
}

export default SearchTextfield