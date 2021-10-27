import {
    CREATE_PRODUCT_START,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILED,
    UPDATE_PRODUCT_START,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILED,
    DELETE_PRODUCT_START,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILED,
    GET_ALL_PRODUCTS_START,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAILED,
    DELETE_MANY_PRODUCTS_START,
    DELETE_MANY_PRODUCTS_SUCCESS,
    DELETE_MANY_PRODUCTS_FAILED
} from '../../constants/productConstants';

const productReducer = (state, action) => {
    switch (action.type) {

        // GET ALL Products
        case GET_ALL_PRODUCTS_START:
            return {
                products: [],
                isFetching: true,
                error: null
            }

        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                products: action.payload,
                isFetching: false,
                error: null
            }

        case GET_ALL_PRODUCTS_FAILED:
            return {
                products: [],
                isFetching: false,
                error: action.payload
            }

        // CREATE Products
        case CREATE_PRODUCT_START:
            return {
                products: [...state.products],
                isFetching: true,
                error: null
            }

        case CREATE_PRODUCT_SUCCESS:
            return {
                products: [...state.products, action.payload],
                isFetching: false,
                error: null
            }

        case CREATE_PRODUCT_FAILED:
            return {
                products: [...state.products],
                isFetching: false,
                error: action.payload
            }

        // UPDATE Products
        case UPDATE_PRODUCT_START:
            return {
                products: [...state.products],
                isFetching: true,
                error: null
            }
        case UPDATE_PRODUCT_SUCCESS:
            const oldProducts = state.products.filter(product => product._id !== action.payload._id)
            return {
                products: [...oldProducts, action.payload],
                isFetching: false,
                error: null
            }
        case UPDATE_PRODUCT_FAILED:
            return {
                products: [...state.products],
                isFetching: false,
                error: action.payload
            }

        // DELETE Product
        case DELETE_PRODUCT_START:
            return {
                products: [...state.products],
                isFetching: true,
                error: null
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                products: state.products.filter(product => product._id !== action.payload._id),
                isFetching: false,
                error: null
            }
        case DELETE_PRODUCT_FAILED:
            return {
                products: [...state.products],
                isFetching: false,
                error: action.payload
            }

        // Delete Many products
        case DELETE_MANY_PRODUCTS_START:
            return {
                products: [...state.products],
                isFetching: true,
                error: null
            }
        case DELETE_MANY_PRODUCTS_SUCCESS:
            return {
                products: [...action.payload],
                isFetching: false,
                error: null
            }
        case DELETE_MANY_PRODUCTS_FAILED:
            return {
                products: [...state.products],
                isFetching: false,
                error: action.payload
            }

        default:
            return state;
    }
};

export default productReducer;