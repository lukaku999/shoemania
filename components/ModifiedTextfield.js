import React from 'react'
import {Controller} from 'react-hook-form'
import {TextField} from '@mui/material'

const ModifiedTextfield = ({control, fieldInfo}) => {
  return (
  
        <Controller name={fieldInfo.name}
                    control = {control}
               
                    defaultValue = {fieldInfo.default}
                    rules = {fieldInfo.rules}
                    render = {({field}) => (
                        <TextField variant = "outlined"
                                    fullWidth
                                    id = {fieldInfo.name}
                                    label={fieldInfo.label}
                                    InputLabelProps={{ shrink: field.value ? true: false }}
                                    InputProps={fieldInfo.inputAdornment}
                                    inputProps={{type: fieldInfo.type}}
                                    error={Boolean(fieldInfo.error)}
                                    helperText = {fieldInfo.helperText}
                                    disabled = {fieldInfo.disabled}
                                    {...field}
                                    value = {field.value ? field.value : ''}
                                    />             
                    )}>
        </Controller>
    
  )
}

export default ModifiedTextfield