import { CREATE_PRODUCT_FAILED, CREATE_PRODUCT_START, CREATE_PRODUCT_SUCCESS, DELETE_MANY_PRODUCTS_FAILED, DELETE_MANY_PRODUCTS_START, DELETE_MANY_PRODUCTS_SUCCESS, DELETE_PRODUCT_FAILED, DELETE_PRODUCT_START, DELETE_PRODUCT_SUCCESS, GET_ALL_PRODUCTS_FAILED, GET_ALL_PRODUCTS_START, GET_ALL_PRODUCTS_SUCCESS, UPDATE_PRODUCT_FAILED, UPDATE_PRODUCT_START, UPDATE_PRODUCT_SUCCESS } from "../../constants/productConstants"


// CREATE New Product
export const createProductStart = () => ({ type: CREATE_PRODUCT_START });
export const createProductSuccess = (product) => ({ type: CREATE_PRODUCT_SUCCESS, payload: product });
export const createProductFailed = (error) => ({ type: CREATE_PRODUCT_FAILED, payload: error });


// UPDATE Product
export const updateProductStart = () => ({ type: UPDATE_PRODUCT_START });
export const updateProductSuccess = (product) => ({ type: UPDATE_PRODUCT_SUCCESS, payload: product });
export const updateProductFailed = (error) => ({ type: UPDATE_PRODUCT_FAILED, payload: error });


// DELETE Product
export const deleteProductStart = () => ({ type: DELETE_PRODUCT_START });
export const deleteProductSuccess = (product) => ({ type: DELETE_PRODUCT_SUCCESS, payload: product });
export const deleteProductFailed = (error) => ({ type: DELETE_PRODUCT_FAILED, payload: error });


// Delete Many Product
export const deleteManyProductsStart = () => ({ type: DELETE_MANY_PRODUCTS_START });
export const deleteManyProductsSuccess = (products) => ({ type: DELETE_MANY_PRODUCTS_SUCCESS, payload: products });
export const deleteManyProductsFailed = (error) => ({ type: DELETE_MANY_PRODUCTS_FAILED, payload: error });


// GET All Products
export const getAllProductsStart = () => ({ type: GET_ALL_PRODUCTS_START });
export const getAllProductsSuccess = (products) => ({ type: GET_ALL_PRODUCTS_SUCCESS, payload: products });
export const getAllProductsFailed = (error) => ({ type: GET_ALL_PRODUCTS_FAILED, payload: error });
