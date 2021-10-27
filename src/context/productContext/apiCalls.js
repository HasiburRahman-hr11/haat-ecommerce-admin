import axios from 'axios';
import {
    createProductFailed,
    createProductStart,
    createProductSuccess,
    deleteManyProductsFailed,
    deleteManyProductsStart,
    deleteManyProductsSuccess,
    deleteProductFailed,
    deleteProductStart,
    deleteProductSuccess,
    getAllProductsFailed,
    getAllProductsStart,
    getAllProductsSuccess,
    updateProductFailed,
    updateProductStart,
    updateProductSuccess
} from './productActions';

import { successNotify, errorNotify } from '../../utils/toastify';


// Get All Products
export const getAllProducts = async (dispatch) => {
    dispatch(getAllProductsStart());
    try {
        const { data } = await axios.get('/api/products');
        dispatch(getAllProductsSuccess(data.products))
    } catch (error) {
        console.log(error);
        dispatch(getAllProductsFailed(error))
    }
}

// Create New Product
export const addNewProduct = async (dispatch, formData, config, history) => {
    dispatch(createProductStart());

    try {
        const { data } = await axios.post('/api/products/create', formData, config);

        dispatch(createProductSuccess(data));
        history.push(`/admin/products/edit/${data._id}`);
        successNotify('Product Created Successfully');
    } catch (error) {
        console.log(error);
        dispatch(createProductFailed(error))
        errorNotify('Opps, Something Went Wrong!');
    }
}


// Update a Product
export const updateProduct = async (dispatch, formData, config, productId) => {
    dispatch(updateProductStart());

    try {
        const { data } = await axios.put(`/api/products/edit/${productId}`, formData, config);

        dispatch(updateProductSuccess(data));
        successNotify('Product Updated Successfully');
    } catch (error) {
        console.log(error);
        dispatch(updateProductFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}


// Delete a product
export const deleteProduct = async (dispatch, productId, token) => {
    dispatch(deleteProductStart());
    try {
        const { data } = await axios.delete(`/api/products/${productId}`, {
            headers: {
                token: token
            }
        });

        dispatch(deleteProductSuccess(data));
        successNotify('Product Deleted Successfully');
    } catch (error) {
        console.log(error);
        dispatch(deleteProductFailed());
        errorNotify('Opps, Something Went Wrong!');
    }
}



// Delete Many Product
export const deleteManyProducts = async (dispatch, products, token) => {
    dispatch(deleteManyProductsStart());
    try {
        const { data } = await axios.post('/api/products/delete/many',
            { productIds: products }, {
            headers: {
                token: token
            }
        });
        dispatch(deleteManyProductsSuccess(data));
        successNotify(`${products.length} ${products.length > 1 ? 'Products' : 'Product'} Deleted Successfully`);
    } catch (error) {
        console.log(error);
        dispatch(deleteManyProductsFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}