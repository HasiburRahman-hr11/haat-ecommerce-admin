import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Delete, Edit } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';

import Search from '../Search/Search';
import handleChecked from '../../utils/handleChecked';
import { Link } from 'react-router-dom';
import { deleteManyProducts, deleteProduct } from '../../context/productContext/apiCalls';
import { ProductContext } from '../../context/productContext/productContext';
import { AuthContext } from '../../context/authContext/AuthContext';



export default function ProductsTable({ thead, data }) {
    const { dispatch } = useContext(ProductContext);
    const { admin } = useContext(AuthContext);


    const [items, setItems] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState([]);

    const handleChange = handleChecked(items, selectedItem, setSelectedItem);

    const handleDeleteProduct = (id) => {
        const agree = window.confirm('Confirm Delete?');
        if (agree) {
            deleteProduct(dispatch, id, admin.accessToken)
        }

    }


    const handleMultipleDelete = () => {
        const ids = [];
        if (selectedItem.length > 0) {
            selectedItem.forEach(item => {
                ids.push(item._id)
            });

            const agree = window.confirm('Confirm Delete?');
            if (agree) {
                deleteManyProducts(dispatch, ids, admin.accessToken);
                setSelectedItem([]);
            }

        }
    }


    const handleSearch = (e) => {
        const query = e.target.value
        setSearchQuery(query);

        const filteredData = [];
        data.forEach(product => {
            let title = product.title.toLowerCase().includes(query.toLowerCase())
            let desc = product.description.toLowerCase().includes(query.toLowerCase())

            if (title || desc) {
                if (!filteredData.includes(product)) {
                    filteredData.push(product)
                }
            }

            product.categories.forEach(cat => {
                if (cat.toLowerCase().includes(query.toLowerCase())) {
                    if (!filteredData.includes(product)) {
                        filteredData.push(product)
                    }
                }
            })
        });
        setItems(filteredData)
    }



    return (
        <Box
            component={Paper}
            className="admin_table_wrapper"
        >
            <Box
                component="div"
            >
                {selectedItem.length > 0 ? (
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '30px 20px',
                            backgroundColor: '#C8FACD'
                        }}
                    >

                        <span style={{ color: 'var(--primary-color)' }}>{selectedItem.length} Item{selectedItem.length > 1 ? 's' : ''} Selected</span>
                        <Delete
                            onClick={handleMultipleDelete}
                            sx={{
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        />
                    </Box>
                ) : (
                    <Grid
                        container
                        spacing={4}
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '30px 20px',
                        }}
                    >

                        <Grid item sm={6} xs={12}>
                            <Search
                                value={searchQuery}
                                setValue={setSearchQuery}
                                handleChange={handleSearch}
                            />
                        </Grid>

                        <Grid item sm={6} xs={12} sx={{
                            textAlign: {
                                sm: 'right'
                            }
                        }}>
                            <Link to="/admin/products/add" className="add_btn btn-outline-primary">Add New</Link>
                        </Grid>

                    </Grid>

                )}

            </Box>
            {items.length > 0 ? (
                <TableContainer component="div">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" className="admin_table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        width: '48px'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        className="table_check"
                                        name="allSelect"
                                        checked={selectedItem?.length === items?.length}
                                        onChange={(e) => handleChange(e, items)}
                                    />
                                </TableCell>
                                {thead.map((th) => (
                                    <TableCell key={th} align="left">{th}</TableCell>
                                ))}
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, ind) => (
                                <TableRow
                                    key={item._id + ind}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            className="table_check"
                                            name={item._id}
                                            // checked when selectedItem contains checked object/filed/row
                                            checked={selectedItem.some((curItem) => curItem?._id === item._id)}
                                            onChange={(e) => handleChange(e, item)}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: '600' }}>
                                        {item.title}
                                    </TableCell>
                                    <TableCell align="left">{item.regularPrice}</TableCell>
                                    <TableCell align="left">{item.salePrice}</TableCell>
                                    <TableCell align="left">
                                        {item.inStock ? <span className="td_stock">In Stock</span> : <span className="td_stock td_stock_out">Stock Out</span>}
                                    </TableCell>
                                    <TableCell align="left">
                                        <List sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ListItem sx={{ maxWidth: '50px' }} >
                                                <Link to={`/admin/products/edit/${item._id}`}>
                                                    <Tooltip title="Edit">
                                                        <Edit sx={{ color: '#666' }} />
                                                    </Tooltip>
                                                </Link>
                                            </ListItem>
                                            <ListItem sx={{ maxWidth: '50px', marginBottom: '5px', cursor: 'pointer' }} onClick={() => handleDeleteProduct(item._id)} >
                                                <Tooltip title="Delete">
                                                    <Delete sx={{ color: '#666' }} />
                                                </Tooltip>
                                            </ListItem>
                                        </List>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box component="div" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '20px',
                    paddingBottom: '50px'
                }}>
                    <Box component="h2" sx={{
                        color: '#666',
                        fontSize: {
                            sm: '25px',
                            xs: '20px'
                        }
                    }}>No Product Found!</Box>
                </Box>
            )}


        </Box>
    );
}