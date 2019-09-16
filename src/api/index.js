/*
* 对axios进行进一步封装
* */

import axios from './request'

export const reqUser = (username,password)=>axios.post('/login',{username,password})
export const reqGetCategories = ()=>axios.get('/category/get')
export const addGetCategoriesSucess = (categoryName)=>axios.post('/category/add',{categoryName})