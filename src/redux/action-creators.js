/*
* 用来创建生产action对象工厂函数的模块
* */

import { SAVE_USER,SET_TITLE,INIT_USER,GET_CATEGORIES_SUCCESS,ADD_CATEGORY } from './action-types'
import { reqGetCategories,addGetCategoriesSucess } from '../api/index'


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


