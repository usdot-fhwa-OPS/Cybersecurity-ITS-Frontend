import React from 'react'
import { Box, CircularProgress } from '@mui/material'
export default function SpinningWheel({ isLoading }) {
    return (
        <>
        {
            isLoading &&
            <Box className='floating'>
                <CircularProgress />
            </Box>
        }
        </>
    )
}
