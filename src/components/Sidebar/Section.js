import React from 'react';
import Box from '@mui/material/Box';

const Section = (props) => {
    return (
        <Box
        components="div"
        className="sidebar_section"
        sx={{
            marginBottom:'20px'
        }}
    >
        <h3 className="sidebbar_section_title">{props.title}</h3>
        <Box
            components="div"
            className="sidebar_section_content"
        >
            {props.children}
        </Box>
    </Box>
    );
};

export default Section;