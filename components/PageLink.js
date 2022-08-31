import React from 'react'
import {Link} from '@mui/material'
import NextLink from 'next/link'



const PageLink = ({href, children}) => {
  return (
    <NextLink href= {href} passHref>
        <Link>
            {children}
        </Link>
    </NextLink>
  )
}

export default PageLink