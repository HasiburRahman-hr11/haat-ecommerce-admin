import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import SalesChart from '../../components/Charts/SalesChart';
import UserChart from '../../components/Charts/UserChart';
import { AuthContext } from '../../context/authContext/AuthContext';
import { OrderContext } from '../../context/orderContext/orderContext';
import axios from 'axios';

const Dashboard = () => {
    const { admin } = useContext(AuthContext);
    const { orders } = useContext(OrderContext);

    const [newUsers, setNewUsers] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState('');

    const pendingOrders = orders.filter(order => order.status.toLowerCase() === 'pending');

    // Numbers to k and m
    const nFormatter = (num) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }



    useEffect(() => {

        // Get New Users (last 30 days)
        const getNewUsers = async () => {
            try {
                const { data } = await axios.get('/api/users/new', {
                    headers: {
                        token: admin.accessToken
                    }
                });
                setNewUsers(data);
            } catch (error) {
                console.log(error);
            }
        }


        // Get New Users (last 30 days)
        const getNewOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders/new', {
                    headers: {
                        token: admin.accessToken
                    }
                });
                setMonthlyIncome(nFormatter(data.reduce((a, c) => a + c.amount, 0)))
            } catch (error) {
                console.log(error);
            }
        }

        getNewUsers();

        getNewOrders();
    }, [admin.accessToken])

    return (
        <>
            <Box
                component="div"
                className="page dashboard"
            >
                <Box
                    component="div"
                    sx={{
                        marginBottom: '20px'
                    }}
                >
                    <h4 className="dashboard_greeting">{`Hello ${admin.firstName}, Welcome Back`}</h4>
                </Box>

                {/* Overview */}
                <Box
                    className="dashboard_overview"
                    component="div"
                    sx={{
                        marginBottom: '30px'
                    }}
                >
                    <Grid
                        container
                        spacing={4}
                    >
                        <Grid
                            item
                            lg={3}
                            md={3}
                            sm={6}
                            xs={6}
                        >
                            <Box
                                className="ov_item"
                                component="div"
                                sx={{
                                    backgroundColor: '#C8FACD',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '150px',
                                    borderRadius: '5px',
                                    color: '#186659'
                                }}
                            >
                                <div>
                                    <h2 className="ov_title">{monthlyIncome}</h2>
                                    <p className="ov_text">Monthly Sales</p>
                                </div>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            md={3}
                            sm={6}
                            xs={6}

                        >
                            <Box
                                className="ov_item"
                                component="div"
                                sx={{
                                    backgroundColor: '#D0F2FF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '150px',
                                    borderRadius: '5px',
                                    color: '#04297A'
                                }}
                            >
                                <div>
                                    <h2 className="ov_title">{newUsers.length}</h2>
                                    <p className="ov_text">New User{newUsers.length > 1 ? 's' : ''}</p>
                                </div>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            md={3}
                            sm={6}
                            xs={6}
                        >
                            <Box
                                className="ov_item"
                                component="div"
                                sx={{
                                    backgroundColor: '#FFF7CD',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '150px',
                                    borderRadius: '5px',
                                    color: '#7A4F01'
                                }}
                            >
                                <div>
                                    <h2 className="ov_title">{orders.length}</h2>
                                    <p className="ov_text">Total Order{orders.length > 1 ? 's' : ''}</p>
                                </div>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            md={3}
                            sm={6}
                            xs={6}
                        >
                            <Box
                                className="ov_item"
                                component="div"
                                sx={{
                                    backgroundColor: '#FFE7D9',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '150px',
                                    borderRadius: '5px',
                                    color: '#7A0C2E'
                                }}
                            >
                                <div>
                                    <h2 className="ov_title">{pendingOrders.length}</h2>
                                    <p className="ov_text">Pending Order{pendingOrders.length > 1 ? 's' : ''}</p>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>


                {/* Charts */}
                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        item
                        lg={8}
                        md={8}
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
                        lg={4}
                        md={4}
                        sm={12}
                        xs={12}
                    >
                        <Box
                            component="div"
                            className="chart_wrapper"
                        >
                            <h3 className="chart_title">User Chart</h3>
                            <UserChart />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Dashboard;