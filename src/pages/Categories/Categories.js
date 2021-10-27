import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import CategoriesTable from '../../components/Table/CategoriesTable';
import { CategoryContext } from '../../context/categoryContext/categoryContext';
import Loading from '../../components/Loading/Loading';

const thead = ['Category', 'Products'];

const Categories = () => {
    const { categories, isFetching } = useContext(CategoryContext);

    const sortedCategories =  categories.sort((a, b) => a.title.localeCompare(b.title))
    return (
        <>
            {isFetching ? <Loading /> : (
                <>
                    <Box
                        component="div"
                        className="page users"
                    >
                        <Box
                            component="div"
                            sx={{
                                marginBottom: '20px'
                            }}
                        >
                            <h4 className="page_title">Categories</h4>
                        </Box>

                        <CategoriesTable thead={thead} data={sortedCategories} />

                    </Box>
                </>
            )}
        </>
    );
};

export default Categories;