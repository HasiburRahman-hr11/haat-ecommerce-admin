import axios from 'axios';
import { createCategoryFailed, createCategoryStart, createCategorySuccess, deleteCategoryFailed, deleteCategoryStart, deleteCategorySuccess, deleteManyCategoriesFailed, deleteManyCategoriesStart, deleteManyCategoriesSuccess, getAllCategoriesFailed, getAllCategoriesStart, getAllCategoriesSuccess, updateCategoryFailed, updateCategoryStart, updateCategorySuccess } from './categoryActions';
import { successNotify, errorNotify } from '../../utils/toastify';


// Add New Category
export const addNewCategory = async (dispatch, formData, config, history) => {
    dispatch(createCategoryStart());

    try {
        const { data } = await axios.post('/api/category/create', formData, config);
        dispatch(createCategorySuccess(data));
        if(history){
            history.push(`/admin/categories/edit/${data._id}`);
        }
        successNotify('Category Added Successfully');
    } catch (error) {
        console.log(error);
        dispatch(createCategoryFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}


// Update Category
export const updateCategory = async (dispatch, formData, config, catId) => {
    dispatch(updateCategoryStart());

    try {
        const { data } = await axios.put(`/api/category/${catId}`, formData, config);
        dispatch(updateCategorySuccess(data));
        successNotify('Category Updated Successfully');
    } catch (error) {
        console.log(error);
        dispatch(updateCategoryFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}

// Get All Categories
export const getAllCategories = async (dispatch) => {
    dispatch(getAllCategoriesStart());
    try {
        const { data } = await axios.get('/api/category');
        dispatch(getAllCategoriesSuccess(data))
    } catch (error) {
        console.log(error);
        dispatch(getAllCategoriesFailed(error))
    }
}


// Delete a Category
export const deleteCategory = async (dispatch, catId, token) => {
    dispatch(deleteCategoryStart());
    try {
        const { data } = await axios.delete(`/api/category/${catId}`, {
            headers: {
                token: token
            }
        });

        dispatch(deleteCategorySuccess(data));
        successNotify('Category Deleted Successfully');
    } catch (error) {
        console.log(error);
        dispatch(deleteCategoryFailed());
        errorNotify('Opps, Something Went Wrong!');
    }
}


// Delete Many Category
export const deleteManyCategories = async (dispatch, categories, token) => {
    dispatch(deleteManyCategoriesStart());
    try {
        const { data } = await axios.post('/api/category/delete/many',
            { categoryIds: categories }, {
            headers: {
                token: token
            }
        });
        dispatch(deleteManyCategoriesSuccess(data));
        successNotify(`${categories.length} ${categories.length > 1 ? 'Categories' : 'Category'} Deleted Successfully`);
    } catch (error) {
        console.log(error);
        dispatch(deleteManyCategoriesFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}
