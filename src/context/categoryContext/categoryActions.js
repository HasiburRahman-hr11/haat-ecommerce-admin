import { CREATE_CATEGORY_FAILED, CREATE_CATEGORY_START, CREATE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILED, DELETE_CATEGORY_START, DELETE_CATEGORY_SUCCESS, DELETE_MANY_CATEGORIES_FAILED, DELETE_MANY_CATEGORIES_START, DELETE_MANY_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAILED, GET_ALL_CATEGORIES_START, GET_ALL_CATEGORIES_SUCCESS, UPDATE_CATEGORY_FAILED, UPDATE_CATEGORY_START, UPDATE_CATEGORY_SUCCESS } from "../../constants/categoryConstants";



// CREATE New Category
export const createCategoryStart = () => ({type:CREATE_CATEGORY_START});
export const createCategorySuccess = (category) =>({type:CREATE_CATEGORY_SUCCESS , payload:category});
export const createCategoryFailed = (error) =>({type:CREATE_CATEGORY_FAILED , payload:error});


// UPDATE category
export const updateCategoryStart = () => ({type:UPDATE_CATEGORY_START});
export const updateCategorySuccess = (category) =>({type:UPDATE_CATEGORY_SUCCESS , payload:category});
export const updateCategoryFailed = (error) =>({type:UPDATE_CATEGORY_FAILED , payload:error});


// DELETE category
export const deleteCategoryStart = () => ({type:DELETE_CATEGORY_START});
export const deleteCategorySuccess = (category) =>({type:DELETE_CATEGORY_SUCCESS , payload:category});
export const deleteCategoryFailed = (error) =>({type:DELETE_CATEGORY_FAILED , payload:error});


// GET All Categories
export const getAllCategoriesStart = () => ({type:GET_ALL_CATEGORIES_START});
export const getAllCategoriesSuccess = (categories) =>({type:GET_ALL_CATEGORIES_SUCCESS , payload:categories});
export const getAllCategoriesFailed = (error) =>({type:GET_ALL_CATEGORIES_FAILED, payload:error});



// Delete Many Category
export const deleteManyCategoriesStart = () => ({ type: DELETE_MANY_CATEGORIES_START });
export const deleteManyCategoriesSuccess = (categories) => ({ type: DELETE_MANY_CATEGORIES_SUCCESS, payload: categories });
export const deleteManyCategoriesFailed = (error) => ({ type: DELETE_MANY_CATEGORIES_FAILED, payload: error });
