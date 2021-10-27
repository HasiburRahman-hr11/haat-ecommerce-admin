import React from 'react';
import './Search.css';
import Box from '@mui/material/Box';
import { SearchOutlined } from '@mui/icons-material';

const Search = ({ value , handleChange }) => {
    return (
        <Box
            component="div"
        >
            <Box
                className="search_box"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #ddd',
                    padding: '5px 10px',
                    maxWidth: {
                        sm:'270px',
                        xs:'100%'
                    },
                    borderRadius: '5px'
                }}
            >
                <SearchOutlined
                    sx={{
                        cursor: 'pointer',
                        color: '#666'
                    }}
                />
                <input
                    type="text"
                    className="search_input"
                    placeholder="Search Here..."
                    onChange={(e)=>handleChange(e)}
                    value={value}
                />
            </Box>
        </Box>
    );
};

export default Search;