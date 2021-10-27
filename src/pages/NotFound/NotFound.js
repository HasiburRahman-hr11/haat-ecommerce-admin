import React from 'react';
import Box from '@mui/material/Box';
import errorImage from '../../images/404.png';

const NotFound = () => {
    return (
        <Box component="div"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >

            <Box component="div"
                sx={{
                    width: '100%',
                    paddingLeft:{lg:'250px' , md:'250px'}
                }}
            >
                <Box component="div"
                    sx={{
                        maxWidth: '500px',
                        padding: '30px',
                        margin: '0 auto',
                    }}
                >
                    <img src={errorImage} alt="Page Not Found" />
                </Box>
            </Box>

        </Box>
    );
};

export default NotFound;