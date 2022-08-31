import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import classes from '../utils/classes'
import PageLink from './PageLink'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Footer = ({}) => {
    const links = [ 
        {
            icon: <FacebookIcon/>
        },
        {
            icon: <TwitterIcon/>
        },
        {
            icon: <InstagramIcon/>
        },
        {
            icon: <LinkedInIcon/>
        },
        {
            icon: <MailOutlineIcon/>
        }                 
    ]
  return (
    <Box component="footer" sx = {classes.footer}>
        <Grid   container 
                sx = {{padding: '3rem', borderTop: '1px solid lightgray'}} 
                justifyContent = 'space-between'>
            <Grid item>
                <Typography variant="h4">Shoemania</Typography>
            </Grid>
            <Grid item >
                <Grid container justifyContent = 'space-between'>
                    {
                        links.map(link => 
                            <Grid item sx = {{marginRight: '1rem'}}>
                                <a >

                                </a>
                                {link.icon}
                            </Grid>
                        )
                    }
                    
                   
                </Grid>
                
                
            </Grid>
        </Grid>
    </Box>
    
                

    

  )
}

export default Footer