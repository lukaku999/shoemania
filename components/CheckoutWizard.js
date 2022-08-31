import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

const CheckoutWizard = ({activeStep = 0}) => {
  const stepArray = ['Login', 'Shipping Address', 'Payment Method', 'Place Order']
  return (
    <Stepper activeStep = {activeStep} altenativeLabel>
        {
            stepArray.map((step) => 
                <Step key = {step}>
                    <StepLabel>
                        {step}
                    </StepLabel>
                </Step>
            )
        }
    </Stepper>
  )
}

export default CheckoutWizard