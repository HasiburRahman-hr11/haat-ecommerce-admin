import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext/AuthContext';
import { OrderContext } from '../../context/orderContext/orderContext';
import { CircularProgress } from '@mui/material';
import Loading from '../../components/Loading/Loading';
import { updateOrder } from '../../context/orderContext/apiCalls';

const EditOrder = () => {
    const params = useParams();
    const { admin } = useContext(AuthContext);
    const { dispatch, isFetching } = useContext(OrderContext);

    const [status, setStatus] = useState('');
    const [amount, setAmount] = useState(Number);
    const [orderNote, setOrderNote] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderData = {
            status,
            amount,
            orderNote
        }
        updateOrder(dispatch, params.orderId, orderData, admin.accessToken);
    }

    useEffect(() => {

        const fetchOrder = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://hidden-crag-34912.herokuapp.com/api/orders/${params.orderId}`, {
                    headers: {
                        token: admin.accessToken
                    }
                });
                setInitialValue(data)
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchOrder();

        const setInitialValue = (data) => {
            setStatus(data.status);
            setAmount(data.amount);
            setOrderNote(data.orderNote);
        }
    }, [params.orderId, admin.accessToken]);



    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Box component="div" className="page edit_order">
                    <Box
                        component="div"
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <h4 className="page_title">Edit Order</h4>
                    </Box>

                    <form action="" onSubmit={handleSubmit}>
                        <Box
                            component={Paper}
                            className="add_new_wrapper"
                            sx={{
                                padding: '30px 20px'
                            }}
                        >

                            <Box>
                                <Grid container spacing={3}>

                                    <Grid item sm={4} xs={12}>
                                        <div className="form_group">
                                            <label htmlFor="status">Order Status</label>
                                            <select
                                                name="status"
                                                id="status"
                                                className="add_input"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="delivered">Delivered</option>
                                            </select>
                                        </div>

                                        <div className="form_group">
                                            <label htmlFor="amount">Order Amount</label>
                                            <input
                                                type="text"
                                                name="amount"
                                                className="add_input"
                                                id="amount"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item sm={8} xs={12}>
                                        <div className="form_group">
                                            <label htmlFor="orderNote">Order Note</label>
                                            <textarea
                                                type="text"
                                                name="orderNote"
                                                id="orderNote"
                                                className="add_input"
                                                value={orderNote}
                                                onChange={(e) => setOrderNote(e.target.value)}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>


                            </Box>


                            <div className="form_group">
                                <button
                                    type="submit"
                                    className="btn btn-primary" style={{
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    {isFetching ? <CircularProgress color="inherit" sx={{ width: '20px !important', height: '20px !important' }} /> : 'Update'}
                                </button>
                            </div>

                        </Box>
                    </form>
                </Box>
            )}
        </>
    );
};

export default EditOrder;