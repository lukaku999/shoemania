import { ListItem, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import classes from '../utils/classes'


const SearchMenu = ({title, handler, menuData, value}) => {
    //const {state: {productData: {categories}}} = useContext(Store)
    return (
        <>
            
            <ListItem>
                <Box sx = {classes.fullWidth}>
                    <Typography>{title}</Typography>
                    <Select fullWidth 
                            value = {value}
                            onChange = {handler}>
                                <MenuItem value = "all">All</MenuItem>
                                {menuData && menuData.map(val => 
                                    <MenuItem key = {val} value = {val}>
                                        {val}
                                    </MenuItem>
                                )}
                    </Select>
                </Box>
            </ListItem>
        </>
        
    )
}

export default SearchMenu