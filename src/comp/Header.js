import { Box, Typography } from '@mui/material'
import React from 'react'

function Header() {
  return (
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',margin:'0px 10px 10px'}}>
        <Typography variant='h3'>
            Employee register
        </Typography>
    </Box>
  )
}

export default Header