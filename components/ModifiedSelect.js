import React from 'react'
import {Controller} from 'react-hook-form'
import { ListItem, MenuItem, TextField, Select} from '@mui/material'

const ModifiedSelect = ({control, fieldInfo}) => {
  return (
  
        <Controller name={fieldInfo.name}
                    control = {control}
               
                    rules = {fieldInfo.rules}
                    render = {({field}) => (
                        

                                
                        
                                <Select defaultValue='all' fullWidth {...field} value = {field.value ? field.value : 'all'}>
                                    {console.log(field.value, "spread mother f")} 
                                    {fieldInfo.selectValues && fieldInfo.selectValues.map(select => 
                                        <MenuItem key = {select} value = {select}>
                                            {select}
                                        </MenuItem>
                                    )}
                                </Select>
                                    
                            
                                  
                    )}>
        </Controller>
    
  )
}

export default ModifiedSelect