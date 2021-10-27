import { CREATE_CATEGORY_FAILED, CREATE_CATEGORY_START, CREATE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILED, DELETE_CATEGORY_START, DELETE_CATEGORY_SUCCESS, DELETE_MANY_CATEGORIES_FAILED, DELETE_MANY_CATEGORIES_START, DELETE_MANY_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAILED, GET_ALL_CATEGORIES_START, GET_ALL_CATEGORIES_SUCCESS, UPDATE_CATEGORY_FAILED, UPDATE_CATEGORY_START, UPDATE_CATEGORY_SUCCESS } from "../../constants/categoryConstants";


const categoryReducer = (state, action) => {
    switch (action.type) {

        // GET ALL Category
        case GET_ALL_CATEGORIES_START:
            return {
                categories: [],
                isFetching: true,
                error: null
            }

        case GET_ALL_CATEGORIES_SUCCESS:
            return {
                categories: action.payload,
                isFetching: false,
                error: null
            }

        case GET_ALL_CATEGORIES_FAILED:
            return {
                categories: [],
                isFetching: false,
                error: action.payload
            }

        // CREATE Category
        case CREATE_CATEGORY_START:
            return {
                categories: [...state.categories],
                isFetching: true,
                error: null
            }

        case CREATE_CATEGORY_SUCCESS:
            return {
                categories: [...state.categories, action.payload],
                isFetching: false,
                error: null
            }
        case CREATE_CATEGORY_FAILED:
            return {
                categories: [...state.categories],
                isFetching: false,
                error: action.payload
            }


        // UPDATE Category
        case UPDATE_CATEGORY_START:
            return {
                categories: [...state.categories],
                isFetching: true,
                error: null
            }
        case UPDATE_CATEGORY_SUCCESS:
            const oldCategories = state.categories.filter(category => category._id !== action.payload._id)
            return {
                categories: [...oldCategories, action.payload],
                isFetching: false,
                error: null
            }
        case UPDATE_CATEGORY_FAILED:
            return {
                categories: [...state.categories],
                isFetching: false,
                error: action.payload
            }

        // DELETE Category
        case DELETE_CATEGORY_START:
            return {
                categories: [...state.categories],
                isFetching: true,
                error: null
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                categories: state.categories.filter(cat => cat._id !== action.payload._id),
                isFetching: false,
                error: null
            }
        case DELETE_CATEGORY_FAILED:
            return {
                categories: [...state.categories],
                isFetching: false,
                error: action.payload
            }

        // Delete Many Categories
        case DELETE_MANY_CATEGORIES_START:
            return {
                categories: [...state.categories],
                isFetching: true,
                error: null
            }
        case DELETE_MANY_CATEGORIES_SUCCESS:
            return {
                categories: [...action.payload],
                isFetching: false,
                error: null
            }
        case DELETE_MANY_CATEGORIES_FAILED:
            return {
                categories: [...state.categories],
                isFetching: false,
                error: action.payload
            }

        default:
            return state;
    }
};

export default categoryReducer;