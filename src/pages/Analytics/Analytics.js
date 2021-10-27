import React from 'react';
import './Analytics.css';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import SalesChart from '../../components/Charts/SalesChart';
import VisitorChart from '../../components/Charts/VisitorChart';

const Analytics = () => {
    return (
        <>
            <Box
                component="div"
                className="page analytics"
            >
                <Box
                    component="div"
                    sx={{
                        marginBottom: '20px'
                    }}
                >
                    <h4 className="page_title">Analytics</h4>
                </Box>



                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <Box
                            component="div"
                            className="chart_wrapper"
                        >
                            <h3 className="chart_title">Sales Chart</h3>
                            <SalesChart />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <Box
                            component="div"
                            className="chart_wrapper"
                        >
                            <h3 className="chart_title">Visitors Chart</h3>
                            <VisitorChart />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Analytics;