import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <Box component="div"
        sx={{
            position:'fixed',
            width:'100%',
            height:'100%',
            left:0,
            right:0,
            top:0,
            backgroundColor:'#E3FCE6',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}
        >
            <CircularProgress color="inherit" sx={{marginLeft:{lg:'250px' , md:'250px'}}} />
        </Box>
    );
};

export default Loading;