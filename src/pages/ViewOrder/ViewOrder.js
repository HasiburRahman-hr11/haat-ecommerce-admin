import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';


import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../context/authContext/AuthContext';
import { ProductContext } from '../../context/productContext/productContext';

const ViewOrder = () => {

    const { admin } = useContext(AuthContext);
    const { products: allProducts } = useContext(ProductContext);

    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const params = useParams();

    useEffect(() => {

        const fetchOrder = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/api/orders/${params.orderId}`, {
                    headers: {
                        token: admin.accessToken
                    }
                });

                setOrder(data);
                getOrderedProducts(data);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        fetchOrder();


        const getOrderedProducts = (order) => {
            let productArr = [];
            order.products.forEach(product => {
                const orderedProduct = allProducts.find(p => p._id === product._id);
                if (orderedProduct) {
                    orderedProduct.quantity = product.quantity
                    productArr.push(orderedProduct)
                }
            });
            setProducts(productArr)
            console.log(productArr)
        }


    }, [params.orderId, admin.accessToken, allProducts]);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Box component="div" className="page view_order">
                    <Box component="div"
                        className="add_new_wrapper"
                        sx={{
                            padding: '30px 20px',
                            marginTop: '50px'
                        }}
                    >
                        {order?.billingInformation && (
                            <Grid container spacing={4}>
                                <Grid item
                                    md={4}
                                    sm={5}
                                    xs={12}
                                >
                                    <Box component="div" className="order_info" sx={{

                                    }}>

                                        <Box component="h3" sx={{
                                            color: '#666',
                                            fontWeight: '600',
                                            marginBottom: '25px'
                                        }}>
                                            Order Details
                                        </Box>

                                        <Box component={Paper} sx={{
                                            padding: '15px 10px'
                                        }}>
                                            <Box component="h3" sx={{
                                                fontWeight: '500'
                                            }}>
                                                Name: {order.billingInformation.firstName + ' ' + order.billingInformation.lastName
                                                }
                                            </Box>
                                            {order?.billingInformation?.phone && (
                                                <Box component="p">
                                                    Phone: {order.billingInformation.phone}
                                                </Box>
                                            )}
                                            {order?.billingInformation?.email && (
                                                <Box component="p">
                                                    Email: {order.billingInformation.email}
                                                </Box>
                                            )}
                                            {order?.billingInformation?.address?.street && (
                                                <Box component="p">
                                                    Address: {order.billingInformation.address.street}
                                                </Box>
                                            )}
                                            {order?.billingInformation?.address?.zip && (
                                                <Box component="p">
                                                    ZIP: {order.billingInformation.address.zip}
                                                </Box>
                                            )}
                                            {order?.billingInformation?.address?.city && (
                                                <Box component="p">
                                                    City: {order.billingInformation.address.city}
                                                </Box>
                                            )}
                                            {order?.billingInformation?.address?.state && (
                                                <Box component="p">
                                                    State: {order.billingInformation.address.state}
                                                </Box>
                                            )}
                                            {order?.billingInformation?.address?.country && (
                                                <Box component="p">
                                                    Country: {order.billingInformation.address.country}
                                                </Box>
                                            )}

                                            <Box component="p">
                                                Amount: <strong>${order.amount}</strong>
                                            </Box>
                                            <Box component="p">
                                                Order Status: <Box component="span" sx={{
                                                    backgroundColor: '#E3FCE6',
                                                    color: 'var(--primary-color)',
                                                    padding: '3px 5px',
                                                    borderRadius: '3px'
                                                }}>{order.status}</Box>
                                            </Box>
                                            <Box component="p">
                                                Payment Method: <strong>{order.paymentMethod}</strong>
                                            </Box>

                                            {order.orderNote && (
                                                <Box component="div" sx={{ marginTop: '20px' }}>
                                                    <Box component="h4" sx={{
                                                        color: '#666'
                                                    }}>Order Note</Box>
                                                    <Box component="p" sx={{ fontSize: '14px', color: '#444' }}>{order.orderNote}</Box>
                                                </Box>
                                            )}
                                        </Box>

                                    </Box>
                                </Grid>
                                <Grid item
                                    md={8}
                                    sm={7}
                                    xs={12}
                                >

                                    <Box component="div" className="order_overview">
                                        <Box component="h3" sx={{
                                            color: '#666',
                                            fontWeight: '600',
                                            marginBottom: '25px'
                                        }}>
                                            Ordered Items
                                        </Box>

                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell></TableCell>
                                                        <TableCell>Product</TableCell>
                                                        <TableCell align="right">Price</TableCell>
                                                        <TableCell align="right">Quantity</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {products.map((product) => (
                                                        <TableRow
                                                            key={product._id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row" sx={{
                                                                maxWidth: '50px'
                                                            }}>
                                                                {product.thumbnail && (
                                                                    <Box component="img" src={product.thumbnail} alt={product.title} sx={{
                                                                        maxWidth: '50px',
                                                                        maxHeight: '50px',
                                                                        objectFit: 'cover'
                                                                    }}></Box>
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {product.title}
                                                            </TableCell>
                                                            <TableCell align="right">{product.salePrice ? product.salePrice : product.regularPrice}</TableCell>
                                                            <TableCell align="right">{product.quantity}</TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>


                                    </Box>
                                </Grid>
                            </Grid>
                        )}


                    </Box>
                </Box>
            )}
        </>

    );
};

export default ViewOrder;