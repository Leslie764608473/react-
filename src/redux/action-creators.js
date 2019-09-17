/*
* 用来创建生产action对象工厂函数的模块
* */

import { SAVE_USER,SET_TITLE,INIT_USER,GET_CATEGORIES_SUCCESS,ADD_CATEGORY,UPDATE_CATEGORY,DELETE_CATEGORY } from './action-types'
import { reqGetCategories,addGetCategoriesSucess,reqUpdateCategory,reqDeleteCategory } from '../api/index'


export const saveUser = (user)=>({type:SAVE_USER,data:user})
export const setTitle = (title)=>({type:SET_TITLE,data:title})
export const initUser = ()=>({type:INIT_USER})
const getCategoriesSuccess = (categories)=>({type:GET_CATEGORIES_SUCCESS,data:categories})
//定义获取Categories的异步方法
export const getCategories = () =>{
    return async (dispatch)=>{
        const result = await reqGetCategories()
        dispatch(getCategoriesSuccess(result))
    }
}


const addCategory = (result)=>({type:ADD_CATEGORY,data:result})

export const addCategories = (categoryName) =>{
    return async (dispatch)=>{
        const result = await addGetCategoriesSucess(categoryName)
        dispatch(addCategory(result))
    }
}


const updateCategorySuccess = (result)=>({type:UPDATE_CATEGORY,data:result})

export const updateCategory = (categoryId,categoryName)=>{
    return async (dispatch)=>{
        const result =await reqUpdateCategory(categoryId,categoryName)
        dispatch(updateCategorySuccess(result))
    }
}

const deleteCategorySuccess = (result)=>({type:DELETE_CATEGORY,data:result})
export const deleteCategory = (categoryId)=>{
    return async (dispatch)=>{
        const result = await reqDeleteCategory(categoryId)
        dispatch(deleteCategorySuccess(result))
    }
}


