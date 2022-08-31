import * as React from 'react';
import Popover from '@mui/material/Popover';
import {Button, Card, Grid, Typography, Link} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Store } from '../utils/Store';
import {useRouter} from 'next/router'
import classes from '../utils/classes';
import TooltipTransition from './TooltipTransition';
import { useContext } from 'react';
import { useSnackbar } from 'notistack'

export default function ProfilePopup() {
  const {state: {user, logoutUser}, dispatch} = useContext(Store)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter()
  const {enqueueSnackbar} = useSnackbar()

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogin = () => {
    handlePopoverClose()
    logoutUser(router, enqueueSnackbar, dispatch)  
  };

  const handleClickViewProfile = () => {
    handlePopoverClose()
    
    router.push('/profile')
  };

  const handleClickViewOrders = () => {
    handlePopoverClose()
    
    router.push('/order-history')
  };

  

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    user && <div>
    
            <AccountCircleIcon
              color = "primary"
              sx = {{marginLeft: '1rem'}}
              aria-describedby={id}             
              onClick={handlePopoverOpen}
            />
           
            <Popover  id={id}
                      open={open}
                      sx = {{marginTop:  "1rem"}}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      onClose={handlePopoverClose}
          
          >

            <Card 
                  sx={{height: '21rem', width: '25rem', p: 3}}>
                <Grid container item justifyContent={"center"} sx = {{marginTop: "1rem"}}>
                        <Grid item sx = {{p: 1}}>
                            <TooltipTransition title= {"Profile"}> 
                                {user.image ? <img style = {classes.profileImage}/> : <AccountCircleIcon sx = {classes.profileImage}/>}
                            </TooltipTransition>
                        </Grid>
                        <Grid item sx = {{p: 1}}>                    
                            <Typography sx={{fontSize: '16px'}}>
                                {user.name}
                            </Typography>
                            <Typography sx={{fontSize: '14px', color: 'gray'}}>
                                {user.email}
                            </Typography>
                        </Grid>
                
                </Grid>

                
                            
                <Button fullWidth
                        size = "small"
                        variant = "contained"
                        sx = {{ borderRadius: '100rem', marginTop: '1rem'}}
                        onClick = {handleClickViewProfile}>
                    View Profile
                </Button>
                <Button fullWidth
                        size = "small"
                        variant = "contained"
                        sx = {{ borderRadius: '100rem', marginTop: '1rem'}}
                        onClick = {handleClickViewOrders}>
                    View Order History
                </Button>
                        
                <div style={{marginTop: '1rem', borderTop: '1px solid lightgray'}}>
                    <Button fullWidth
                            size = "small"
                            sx = {{marginTop: '1.5rem'}}
                            variant = "contained"
                            color = "secondary"
                            onClick = {handleClickLogin}>
                            
                        Logout
                    </Button> 
                </div>
            </Card>
          </Popover>
          
        </div>
  );
}