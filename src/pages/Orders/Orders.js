import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import OrdersTable from '../../components/Table/OrdersTable';
import { OrderContext } from '../../context/orderContext/orderContext';
import Loading from '../../components/Loading/Loading';

const thead = ['Customer Name', 'amount', 'status', 'Date'];

const Orders = () => {

    const { orders, isFetching } = useContext(OrderContext);
    const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <>
            {isFetching ? <Loading /> : (
                <Box
                    component="div"
                    className="page orders"
                >
                    <Box
                        component="div"
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        <h4 className="page_title">Orders</h4>
                    </Box>

                    <OrdersTable thead={thead} data={sortedOrders} />

                </Box>
            )}
        </>
    );
};

export default Orders;