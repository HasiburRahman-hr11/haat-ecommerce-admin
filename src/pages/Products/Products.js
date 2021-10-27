import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import ProductsTable from '../../components/Table/ProductsTable';
import { ProductContext } from '../../context/productContext/productContext';
import Loading from '../../components/Loading/Loading';

const thead = ['Name', 'Regular Price', 'Sale Price', 'Stock'];

const Products = () => {
    const { products, isFetching  } = useContext(ProductContext);
    return (
        <>
            {isFetching ? <Loading /> : (
                <>
                    <Box
                        component="div"
                        className="page products"
                    >
                        <Box
                            component="div"
                            sx={{
                                marginBottom: '20px'
                            }}
                        >
                            <h4 className="page_title">Products</h4>
                        </Box>

                        <ProductsTable thead={thead} data={products} />

                    </Box>
                </>
            )}

        </>
    );
};

export default Products;