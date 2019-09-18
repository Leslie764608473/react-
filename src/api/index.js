/*
* 对axios进行进一步封装
* */

import axios from './request'

export const reqUser = (username,password)=>axios.post('/login',{username,password})
export const reqGetCategories = ()=>axios.get('/category/get')
export const addGetCategoriesSucess = (categoryName)=>axios.post('/category/add',{categoryName})
export const reqUpdateCategory = (categoryId,categoryName)=>axios.post('/category/update',{categoryId,categoryName})
export const reqDeleteCategory = (categoryId)=>axios.post('/category/delete',{categoryId})
export const reqProductList = (pageNum,pageSize) =>axios.get('product/list',{params:{pageNum,pageSize}})
export const reqAddProduct = ({categoryId,name,price,desc,detail}) =>axios.post('/product/add',{categoryId,name,price,desc,detail})
export const reqUpdateProduct = ({productId,categoryId,name,price,desc,detail}) =>axios.post('/product/update',{productId,categoryId,name,price,desc,detail})
